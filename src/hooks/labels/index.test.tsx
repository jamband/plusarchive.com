import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import { notificationAction } from "~/mocks/notification-action";
import { router } from "~/mocks/router";
import { csrfCookieHandler, server } from "~/mocks/server";
import { isInvalidated, queryClient, wrapper } from "~/mocks/server-state";
import {
  useCreateLabel,
  useDeleteLabel,
  useLabel,
  useLabelsAdmin,
  useLabelsCountries,
  useLabelsTags,
  useUpdateLabel,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /labels/countries", async () => {
  server.use(
    rest.get("*/labels/countries", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useLabelsCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /labels/tags", async () => {
  server.use(
    rest.get("*/labels/tags", (_, response, context) =>
      response(context.json([{ name: "foo" }]))
    )
  );

  const { result } = renderHook(useLabelsTags, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ name: "foo" }]);
});

test("GET /labels/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    rest.get("*/labels/admin", (_, response, context) =>
      response(context.json([{ id: 1 }]))
    )
  );

  const { result } = renderHook(useLabelsAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toStrictEqual([
    "/labels/admin",
    { name: "", country: "", tag: "", sort: "", page: "1" },
  ]);
});

test("GET /labels/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    rest.get("*/labels/1", (_, response, context) =>
      response(context.json({ id: 1 }))
    )
  );

  const { result } = renderHook(useLabel, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toStrictEqual(["/labels", "1"]);
});

test("POST /labels", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/labels", (_, response, context) =>
      response(context.status(201), context.json({ id: 1 }))
    )
  );

  queryClient.setQueryData(["/labels/admin"], null);

  const { result } = renderHook(useCreateLabel, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/labels", "1"])).toStrictEqual({
    id: 1,
  });

  expect(isInvalidated(["/labels/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/labels/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("PUT /labels/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.put("*/labels/1", (_, response, context) =>
      response(context.json({ id: 1 }))
    )
  );

  queryClient.setQueryData(["/labels", "1"], null);
  queryClient.setQueryData(["/labels/admin"], null);

  const { result } = renderHook(useUpdateLabel, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  await waitFor(() => expect(isInvalidated(["/labels", "1"])).toBe(true));
  expect(isInvalidated(["/labels/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/labels/1");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});

test("DELETE /labels/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.delete("*/labels/1", (_, response, context) =>
      response(context.status(204))
    )
  );

  queryClient.setQueryData(["/labels", "1"], null);
  queryClient.setQueryData(["/labels/admin"], null);

  const { result } = renderHook(useDeleteLabel, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(1));

  expect(isInvalidated(["/labels/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/labels/admin");
  expect(useNotificationAction().setNotification).toBeCalledTimes(1);
});
