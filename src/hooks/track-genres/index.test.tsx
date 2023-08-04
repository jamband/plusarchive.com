import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import {
  useAdminTrackGenres,
  useCreateTrackGenre,
  useDeleteTrackGenre,
  useTrackGenre,
  useUpdateTrackGenre,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /track-genres/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/track-genres/admin", (_, response, context) =>
      response(context.json([{ id: 1 }])),
    ),
  );

  const { result } = renderHook(useAdminTrackGenres, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);
});

test("GET /track-genres/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    rest.get("*/track-genres/1", (_, response, context) =>
      response(context.json({ id: 1 })),
    ),
  );

  const { result } = renderHook(useTrackGenre, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/track-genres", "1"]);
});

test("POST /track-genres", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/track-genres", (_, response, context) =>
      response(context.status(201), context.json({ id: 1 })),
    ),
  );

  queryClient.setQueryData(["/track-genres/admin"], null);
  queryClient.setQueryData(["/tracks/genres"], null);

  const { result } = renderHook(useCreateTrackGenre, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(queryClient.getQueryData(["/track-genres", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/track-genres/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/genres"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/track-genres/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("PUT /track-genres/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.put("*/track-genres/1", (_, response, context) =>
      response(context.json({ id: 1 })),
    ),
  );

  queryClient.setQueryData(["/track-genres", "1"], null);
  queryClient.setQueryData(["/track-genres/admin"], null);
  queryClient.setQueryData(["/tracks/admin"], null);
  queryClient.setQueryData(["/tracks/genres"], null);

  const { result } = renderHook(useUpdateTrackGenre, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(4));

  await waitFor(() => expect(isInvalidated(["/track-genres", "1"])).toBe(true));
  expect(isInvalidated(["/track-genres/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/genres"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/track-genres/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("DELETE /track-genres/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.delete("*/track-genres/1", (_, response, context) =>
      response(context.status(204)),
    ),
  );

  queryClient.setQueryData(["/track-genres", "1"], null);
  queryClient.setQueryData(["/track-genres/admin"], null);
  queryClient.setQueryData(["/tracks/admin"], null);
  queryClient.setQueryData(["/tracks/genres"], null);

  const { result } = renderHook(useDeleteTrackGenre, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(isInvalidated(["/track-genres/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(isInvalidated(["/tracks/genres"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/track-genres/admin");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});
