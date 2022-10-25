import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import { notificationAction } from "~/mocks/notification-action";
import { router } from "~/mocks/router";
import { csrfCookieHandler, server } from "~/mocks/server";
import { isInvalidated, queryClient, wrapper } from "~/mocks/server-state";
import {
  useAdminMusicProviders,
  useCreateMusicProvider,
  useDeleteMusicProvider,
  useMusicProvider,
  useUpdateMusicProvider,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /music-providers/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/music-providers/admin", (_, response, context) =>
      response(context.json([{ id: 1 }]))
    )
  );

  const { result } = renderHook(useAdminMusicProviders, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ id: 1 }]);
});

test("GET /music-providers/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    rest.get("*/music-providers/1", (_, response, context) =>
      response(context.json({ id: 1 }))
    )
  );

  const { result } = renderHook(useMusicProvider, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toStrictEqual(["/music-providers", "1"]);
});

test("POST /music-providers", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/music-providers", (_, response, context) =>
      response(context.status(201), context.json({ id: 1 }))
    )
  );

  queryClient.setQueryData(["/music-providers/admin"], null);
  queryClient.setQueryData(["/tracks/providers"], null);

  const { result } = renderHook(useCreateMusicProvider, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(queryClient.getQueryData(["/music-providers", "1"])).toStrictEqual({
    id: 1,
  });

  expect(isInvalidated(["/music-providers/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/providers"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/music-providers/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("PUT /music-providers/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.put("*/music-providers/1", (_, response, context) =>
      response(context.json({ id: 1 }))
    )
  );

  queryClient.setQueryData(["/music-providers", "1"], null);
  queryClient.setQueryData(["/music-providers/admin"], null);
  queryClient.setQueryData(["/tracks/admin"], null);
  queryClient.setQueryData(["/tracks/providers"], null);

  const { result } = renderHook(useUpdateMusicProvider, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(4));

  await waitFor(() =>
    expect(isInvalidated(["/music-providers", "1"])).toBe(true)
  );
  expect(isInvalidated(["/music-providers/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/providers"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/music-providers/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("DELETE /music-providers/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.delete("*/music-providers/1", (_, response, context) =>
      response(context.status(204))
    )
  );

  queryClient.setQueryData(["/music-providers", "1"], null);
  queryClient.setQueryData(["/music-providers/admin"], null);
  queryClient.setQueryData(["/tracks/admin"], null);
  queryClient.setQueryData(["/tracks/providers"], null);

  const { result } = renderHook(useDeleteMusicProvider, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(isInvalidated(["/music-providers/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/providers"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/music-providers/admin");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});