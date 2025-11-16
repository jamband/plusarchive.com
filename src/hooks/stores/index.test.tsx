import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
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

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/hooks/notification", () => ({
  useNotificationAction: vi.fn(),
}));

const router = useRouter as Mock;
const notificationAction = useNotificationAction as Mock;

beforeEach(() => {
  router.mockReset();
  notificationAction.mockReset();
});

test("GET /stores/countries", async () => {
  server.use(
    http.get("*/stores/countries", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useStoresCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /stores/tags", async () => {
  server.use(
    http.get("*/stores/tags", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useStoresTags, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /stores/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/stores/admin", () => {
      return HttpResponse.json([{ id: 1 }]);
    }),
  );

  const { result } = renderHook(useStoresAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/stores/admin",
    { name: "", country: "", tag: "", sort: "", page: "1" },
  ]);
});

test("GET /stores/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    http.get("*/stores/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  const { result } = renderHook(useStore, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/stores", "1"]);
});

test("POST /stores", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/stores", () => {
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/stores/admin"], null);

  const { result } = renderHook(useCreateStore, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/stores", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/stores/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/stores/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /stores/[id]", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/stores/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
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
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /stores/[id]", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/stores/1", () => {
      return new Response(null, { status: 204 });
    }),
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
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
