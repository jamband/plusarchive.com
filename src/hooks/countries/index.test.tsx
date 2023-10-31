import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import {
  useAdminCountries,
  useCountries,
  useCountry,
  useCreateCountry,
  useDeleteCountry,
  useUpdateCountry,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /countries", async () => {
  server.use(
    rest.get("*/countries", (_, response, context) =>
      response(context.json(["bar", "baz", "foo"])),
    ),
  );

  const { result } = renderHook(useCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual(["bar", "baz", "foo"]);
});

test("GET /countries/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/countries/admin", (_, response, context) =>
      response(context.json([{ id: 1 }])),
    ),
  );

  const { result } = renderHook(useAdminCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);
});

test("GET /countries/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    rest.get("*/countries/1", (_, response, context) =>
      response(context.json({ id: 1 })),
    ),
  );

  const { result } = renderHook(useCountry, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/countries", "1"]);
});

test("POST /countries", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/countries", (_, response, context) =>
      response(context.status(201), context.json({ id: 1 })),
    ),
  );

  queryClient.setQueryData(["/countries/admin"], null);
  queryClient.setQueryData(["/bookmarks/countries"], null);

  const { result } = renderHook(useCreateCountry, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(queryClient.getQueryData(["/countries", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/countries/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/countries"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/countries/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /countries/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.put("*/countries/1", (_, response, context) =>
      response(context.json({ id: 1 })),
    ),
  );

  queryClient.setQueryData(["/countries", "1"], null);
  queryClient.setQueryData(["/countries/admin"], null);
  queryClient.setQueryData(["/bookmarks/admin"], null);
  queryClient.setQueryData(["/bookmarks/countries"], null);

  const { result } = renderHook(useUpdateCountry, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(4));

  await waitFor(() => expect(isInvalidated(["/countries", "1"])).toBe(true));
  expect(isInvalidated(["/countries/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/countries"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/countries/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /countries/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.delete("*/countries/1", (_, response, context) =>
      response(context.status(204)),
    ),
  );

  queryClient.setQueryData(["/countries", "1"], null);
  queryClient.setQueryData(["/countries/admin"], null);
  queryClient.setQueryData(["/bookmarks/admin"], null);
  queryClient.setQueryData(["/bookmarks/countries"], null);

  const { result } = renderHook(useDeleteCountry, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(isInvalidated(["/countries/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/admin"])).toBe(true);
  expect(isInvalidated(["/bookmarks/countries"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/countries/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
