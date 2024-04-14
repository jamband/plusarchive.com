import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import {
  useBookmark,
  useBookmarksAdmin,
  useBookmarksCountries,
  useBookmarksTags,
  useCreateBookmark,
  useDeleteBookmark,
  useUpdateBookmark,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /bookmarks/countries", async () => {
  server.use(
    http.get("*/bookmarks/countries", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useBookmarksCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /bookmarks/tags", async () => {
  server.use(
    http.get("*/bookmarks/tags", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useBookmarksTags, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /bookmarks/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/bookmarks/admin", () => {
      return HttpResponse.json([{ id: 1 }]);
    }),
  );

  const { result } = renderHook(useBookmarksAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/bookmarks/admin",
    { name: "", country: "", tag: "", sort: "", page: "1" },
  ]);
});

test("GET /bookmarks/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    http.get("*/bookmarks/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  const { result } = renderHook(useBookmark, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/bookmarks", "1"]);
});

test("POST /bookmarks", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/bookmarks", () => {
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/bookmarks/admin"], null);

  const { result } = renderHook(useCreateBookmark, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/bookmarks", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/bookmarks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/bookmarks/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /bookmarks/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/bookmarks/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  queryClient.setQueryData(["/bookmarks", "1"], null);
  queryClient.setQueryData(["/bookmarks/admin"], null);

  const { result } = renderHook(useUpdateBookmark, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  await waitFor(() => expect(isInvalidated(["/bookmarks", "1"])).toBe(true));
  expect(isInvalidated(["/bookmarks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/bookmarks/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /bookmarks/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/bookmarks/1", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/bookmarks", "1"], null);
  queryClient.setQueryData(["/bookmarks/admin"], null);

  const { result } = renderHook(useDeleteBookmark, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(1));

  expect(isInvalidated(["/bookmarks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/bookmarks/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
