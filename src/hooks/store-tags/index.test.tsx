import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import {
  useCreateStoreTag,
  useDeleteStoreTag,
  useStoreTag,
  useStoreTagsAdmin,
  useUpdateStoreTag,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /store-tags/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/store-tags/admin", () => {
      return HttpResponse.json([{ id: 1 }]);
    }),
  );

  const { result } = renderHook(useStoreTagsAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/store-tags/admin",
    { name: "", sort: "", page: "1" },
  ]);
});

test("GET /store-tags/[id]", async () => {
  router.mockReturnValue({
    query: { id: "1" },
  });

  server.use(
    http.get("*/store-tags/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  const { result } = renderHook(useStoreTag, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/store-tags", "1"]);
});

test("POST /store-tags", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/store-tags", () => {
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/store-tags/admin"], null);
  queryClient.setQueryData(["/stores/tags"], null);

  const { result } = renderHook(useCreateStoreTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(queryClient.getQueryData(["/store-tags", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/store-tags/admin"])).toBe(true);
  expect(isInvalidated(["/stores/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/store-tags/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /store-tags/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/store-tags/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  queryClient.setQueryData(["/store-tags", "1"], null);
  queryClient.setQueryData(["/store-tags/admin"], null);
  queryClient.setQueryData(["/stores/admin"], null);
  queryClient.setQueryData(["/stores/tags"], null);

  const { result } = renderHook(useUpdateStoreTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(4));

  await waitFor(() => expect(isInvalidated(["/store-tags", "1"])).toBe(true));
  expect(isInvalidated(["/store-tags/admin"])).toBe(true);
  expect(isInvalidated(["/stores/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/store-tags/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /store-tags/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/store-tags/1", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/store-tags", "1"], null);
  queryClient.setQueryData(["/store-tags/admin"], null);
  queryClient.setQueryData(["/stores/admin"], null);
  queryClient.setQueryData(["/stores/tags"], null);

  const { result } = renderHook(useDeleteStoreTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));
  expect(isInvalidated(["/store-tags/admin"])).toBe(true);
  expect(isInvalidated(["/stores/admin"])).toBe(true);
  expect(isInvalidated(["/stores/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/store-tags/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
