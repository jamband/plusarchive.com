import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import {
  useCreatePlaylist,
  useDeletePlaylist,
  usePlaylist,
  usePlaylistsAdmin,
  useUpdatePlaylist,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /playlists/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/playlists/admin", () => {
      return HttpResponse.json([{ id: "foo" }]);
    }),
  );

  const { result } = renderHook(usePlaylistsAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: "foo" }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/playlists/admin",
    { title: "", provider: "", sort: "", page: "1" },
  ]);
});

test("GET /playlists/[id]", async () => {
  router.mockReturnValue({
    query: { id: "foo" },
  });

  server.use(
    http.get("*/playlists/foo", () => {
      return HttpResponse.json({ id: "foo" });
    }),
  );

  const { result } = renderHook(usePlaylist, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: "foo" });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/playlists", "foo"]);
});

test("POST /playlists", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/playlists", () => {
      return HttpResponse.json({ id: "foo" }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/playlists/admin"], null);

  const { result } = renderHook(useCreatePlaylist, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/playlists", "foo"])).toEqual({
    id: "foo",
  });
  expect(isInvalidated(["/playlists/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/playlists/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /playlists/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/playlists/foo", () => {
      return HttpResponse.json({ id: "foo" });
    }),
  );

  queryClient.setQueryData(["/playlists", "foo"], null);
  queryClient.setQueryData(["/playlists/admin"], null);

  const { result } = renderHook(useUpdatePlaylist, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {}, id: "foo" });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  await waitFor(() => expect(isInvalidated(["/playlists", "foo"])).toBe(true));
  expect(isInvalidated(["/playlists/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/playlists/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /playlists/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/playlists/foo", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/playlists", "foo"], null);
  queryClient.setQueryData(["/playlists/admin"], null);

  const { result } = renderHook(useDeletePlaylist, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate("foo");
  await waitFor(() => expect(cache.findAll()).toHaveLength(1));

  expect(isInvalidated(["/playlists/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/playlists/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
