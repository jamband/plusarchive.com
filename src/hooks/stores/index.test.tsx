import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import {
  useCreateStore,
  useDeleteStore,
  useStore,
  useStoresAdmin,
  useStoresCountries,
  useStoresTags,
  useUpdateStore,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /stores/countries", async () => {
  server.use(
    rest.get("*/stores/countries", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useStoresCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /stores/tags", async () => {
  server.use(
    rest.get("*/stores/tags", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useStoresTags, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /stores/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/stores/admin", (_, response, context) =>
      response(context.json([{ id: 1 }]))
    )
  );

  const { result } = renderHook(useStoresAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toStrictEqual([
    "/stores/admin",
    { name: "", country: "", tag: "", sort: "", page: "1" },
  ]);
});

test("GET /stores/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    rest.get("*/stores/1", (_, response, context) =>
      response(context.json({ id: 1 }))
    )
  );

  const { result } = renderHook(useStore, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toStrictEqual(["/stores", "1"]);
});

test("POST /stores", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/stores", (_, response, context) =>
      response(context.status(201), context.json({ id: 1 }))
    )
  );

  queryClient.setQueryData(["/stores/admin"], null);

  const { result } = renderHook(useCreateStore, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/stores", "1"])).toStrictEqual({
    id: 1,
  });

  expect(isInvalidated(["/stores/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/stores/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("PUT /stores/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.put("*/stores/1", (_, response, context) =>
      response(context.json({ id: 1 }))
    )
  );

  queryClient.setQueryData(["/stores", "1"], null);
  queryClient.setQueryData(["/stores/admin"], null);

  const { result } = renderHook(useUpdateStore, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  await waitFor(() => expect(isInvalidated(["/stores", "1"])).toBe(true));
  expect(isInvalidated(["/stores/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/stores/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("DELETE /stores/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.delete("*/stores/1", (_, response, context) =>
      response(context.status(204))
    )
  );

  queryClient.setQueryData(["/stores", "1"], null);
  queryClient.setQueryData(["/stores/admin"], null);

  const { result } = renderHook(useDeleteStore, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(1));

  expect(isInvalidated(["/stores/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/stores/admin");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});
