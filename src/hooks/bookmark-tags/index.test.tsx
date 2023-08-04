import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import {
  useBookmarkTag,
  useBookmarkTagsAdmin,
  useCreateBookmarkTag,
  useDeleteBookmarkTag,
  useUpdateBookmarkTag,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /bookmark-tags/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/bookmark-tags/admin", (_, response, context) =>
      response(context.json([{ id: 1 }])),
    ),
  );

  const { result } = renderHook(useBookmarkTagsAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/bookmark-tags/admin",
    { name: "", sort: "", page: "1" },
  ]);
});

test("GET /bookmark-tags/[id]", async () => {
  router.mockReturnValue({
    query: { id: "1" },
  });

  server.use(
    rest.get("*/bookmark-tags/1", (_, response, context) =>
      response(context.json({ id: 1 })),
    ),
  );

  const { result } = renderHook(useBookmarkTag, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/bookmark-tags", "1"]);
});

test("POST /bookmark-tags", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/bookmark-tags", (_, response, context) =>
      response(context.status(201), context.json({ id: 1 })),
    ),
  );

  queryClient.setQueryData(["/bookmark-tags/admin"], null);
  queryClient.setQueryData(["/bookmarks/tags"], null);

  const { result } = renderHook(useCreateBookmarkTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(queryClient.getQueryData(["/bookmark-tags", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/bookmark-tags/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/bookmark-tags/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("PUT /bookmark-tags/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.put("*/bookmark-tags/1", (_, response, context) =>
      response(context.json({ id: 1 })),
    ),
  );

  queryClient.setQueryData(["/bookmark-tags", "1"], null);
  queryClient.setQueryData(["/bookmark-tags/admin"], null);
  queryClient.setQueryData(["/bookmarks/admin"], null);
  queryClient.setQueryData(["/bookmarks/tags"], null);

  const { result } = renderHook(useUpdateBookmarkTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(4));

  await waitFor(() =>
    expect(isInvalidated(["/bookmark-tags", "1"])).toBe(true),
  );
  expect(isInvalidated(["/bookmark-tags/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/bookmark-tags/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("DELETE /bookmark-tags/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.delete("*/bookmark-tags/1", (_, response, context) =>
      response(context.status(204)),
    ),
  );

  queryClient.setQueryData(["/bookmark-tags", "1"], null);
  queryClient.setQueryData(["/bookmark-tags/admin"], null);
  queryClient.setQueryData(["/bookmarks/admin"], null);
  queryClient.setQueryData(["/bookmarks/tags"], null);

  const { result } = renderHook(useDeleteBookmarkTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));
  expect(isInvalidated(["/bookmark-tags/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/bookmark-tags/admin");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});
