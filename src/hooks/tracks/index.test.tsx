import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import {
  useCreateTrack,
  useDeleteTrack,
  useStopUrges,
  useToggleUrge,
  useTrack,
  useTracksAdmin,
  useTracksFavorites,
  useTracksGenres,
  useTracksProviders,
  useUpdateTrack,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /tracks/providers", async () => {
  server.use(
    http.get("*/tracks/providers", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useTracksProviders, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /tracks/genres", async () => {
  server.use(
    http.get("*/tracks/genres", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useTracksGenres, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /tracks/favorites", async () => {
  server.use(
    http.get("*/tracks/favorites", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useTracksFavorites, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /tracks/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/tracks/admin", () => {
      return HttpResponse.json([{ id: "foo" }]);
    }),
  );

  const { result } = renderHook(useTracksAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: "foo" }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/tracks/admin",
    { provider: "", title: "", urge: "", genre: "", sort: "", page: "1" },
  ]);
});

test("GET /tracks/[id]", async () => {
  router.mockReturnValue({
    query: { id: "foo" },
  });

  server.use(
    http.get("*/tracks/foo", () => {
      return HttpResponse.json({ id: "foo" });
    }),
  );

  const { result } = renderHook(useTrack, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: "foo" });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/tracks", "foo"]);
});

test("PATCH /tracks/stop-urges", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.patch("*/tracks/stop-urges", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/tracks/favorites"], null);
  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useStopUrges, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate();
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith("/admin"));
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PATCH /tracks/[id]/toggle-urge", async () => {
  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.patch("*/tracks/foo/toggle-urge", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/tracks/favorites"], null);
  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useToggleUrge, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate("foo");
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));
  await waitFor(() =>
    expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1),
  );
});

test("POST /tracks", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/tracks", () => {
      return HttpResponse.json({ id: "foo" }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useCreateTrack, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/tracks", "foo"])).toEqual({ id: "foo" });
  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/tracks/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /tracks/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/tracks/foo", () => {
      return HttpResponse.json({ id: "foo" });
    }),
  );

  queryClient.setQueryData(["/tracks", "foo"], null);
  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useUpdateTrack, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {}, id: "foo" });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  await waitFor(() => expect(isInvalidated(["/tracks", "foo"])).toBe(true));
  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/tracks/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /tracks/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/tracks/foo", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/tracks", "foo"], null);
  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useDeleteTrack, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate("foo");
  await waitFor(() => expect(cache.findAll()).toHaveLength(1));

  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/tracks/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
