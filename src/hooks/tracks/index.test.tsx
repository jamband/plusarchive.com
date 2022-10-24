import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import { notificationAction } from "~/mocks/notification-action";
import { router } from "~/mocks/router";
import { csrfCookieHandler, server } from "~/mocks/server";
import { isInvalidated, queryClient, wrapper } from "~/mocks/server-state";
import {
  useCreateTrack,
  useDeleteTrack,
  useTrack,
  useTracksAdmin,
  useTracksFavorites,
  useTracksGenres,
  useTracksProviders,
  useTrackStopAllUrges,
  useTrackToggleUrge,
  useUpdateTrack,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /tracks/providers", async () => {
  server.use(
    rest.get("*/tracks/providers", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useTracksProviders, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /tracks/genres", async () => {
  server.use(
    rest.get("*/tracks/genres", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useTracksGenres, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /tracks/favorites", async () => {
  server.use(
    rest.get("*/tracks/favorites", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useTracksFavorites, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /tracks/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/tracks/admin", (_, response, context) =>
      response(context.json([{ id: "foo" }]))
    )
  );

  const { result } = renderHook(useTracksAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ id: "foo" }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toStrictEqual([
    "/tracks/admin",
    { provider: "", title: "", urge: "", genre: "", sort: "", page: "1" },
  ]);
});

test("GET /tracks/[id]", async () => {
  router.mockReturnValue({
    query: { id: "foo" },
  });

  server.use(
    rest.get("*/tracks/foo", (_, response, context) =>
      response(context.json({ id: "foo" }))
    )
  );

  const { result } = renderHook(useTrack, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual({ id: "foo" });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toStrictEqual(["/tracks", "foo"]);
});

test("PATCH /tracks/stop-all-urges", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.patch("*/tracks/stop-all-urges", (_, response, context) =>
      response(context.status(204))
    )
  );

  queryClient.setQueryData(["/tracks/favorites"], null);
  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useTrackStopAllUrges, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate();
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith("/admin"));
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("PATCH /tracks/[id]/toggle-urge", async () => {
  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.patch("*/tracks/foo/toggle-urge", (_, response, context) =>
      response(context.status(204))
    )
  );

  queryClient.setQueryData(["/tracks/favorites"], null);
  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useTrackToggleUrge, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate("foo");
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));
  await waitFor(() =>
    expect(useNotificationAction().setNotification).toBeCalledTimes(1)
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
    rest.post("*/tracks", (_, response, context) =>
      response(context.status(201), context.json({ id: "foo" }))
    )
  );

  queryClient.setQueryData(["/tracks/admin"], null);

  const { result } = renderHook(useCreateTrack, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/tracks", "foo"])).toStrictEqual({
    id: "foo",
  });

  expect(isInvalidated(["/tracks/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/tracks/admin");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
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
    rest.put("*/tracks/foo", (_, response, context) =>
      response(context.json({ id: "foo" }))
    )
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
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
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
    rest.delete("*/tracks/foo", (_, response, context) =>
      response(context.status(204))
    )
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
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});
