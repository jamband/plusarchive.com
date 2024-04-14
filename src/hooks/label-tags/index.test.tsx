import { notificationAction } from "@/mocks/notification-action";
import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import {
  useCreateLabelTag,
  useDeleteLabelTag,
  useLabelTag,
  useLabelTagsAdmin,
  useUpdateLabelTag,
} from ".";
import { useNotificationAction } from "../notification";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/notification", () => ({
  useNotificationAction: jest.fn(),
}));

test("GET /label-tags/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/label-tags/admin", () => {
      return HttpResponse.json([{ id: 1 }]);
    }),
  );

  const { result } = renderHook(useLabelTagsAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/label-tags/admin",
    { name: "", sort: "", page: "1" },
  ]);
});

test("GET /label-tags/[id]", async () => {
  router.mockReturnValue({
    query: { id: "1" },
  });

  server.use(
    http.get("*/label-tags/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  const { result } = renderHook(useLabelTag, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/label-tags", "1"]);
});

test("POST /label-tags", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/label-tags", () => {
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/label-tags/admin"], null);
  queryClient.setQueryData(["/labels/tags"], null);

  const { result } = renderHook(useCreateLabelTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(2);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));

  expect(queryClient.getQueryData(["/label-tags", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/label-tags/admin"])).toBe(true);
  expect(isInvalidated(["/labels/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/label-tags/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /label-tags/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/label-tags/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  queryClient.setQueryData(["/label-tags", "1"], null);
  queryClient.setQueryData(["/label-tags/admin"], null);
  queryClient.setQueryData(["/labels/admin"], null);
  queryClient.setQueryData(["/labels/tags"], null);

  const { result } = renderHook(useUpdateLabelTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate({ body: {}, id: 1 });
  await waitFor(() => expect(cache.findAll()).toHaveLength(4));

  await waitFor(() => expect(isInvalidated(["/label-tags", "1"])).toBe(true));
  expect(isInvalidated(["/label-tags/admin"])).toBe(true);
  expect(isInvalidated(["/labels/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/label-tags/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /label-tags/[id]", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/label-tags/1", () => {
      return new Response(null, { status: 204 });
    }),
  );

  queryClient.setQueryData(["/label-tags", "1"], null);
  queryClient.setQueryData(["/label-tags/admin"], null);
  queryClient.setQueryData(["/labels/admin"], null);
  queryClient.setQueryData(["/labels/tags"], null);

  const { result } = renderHook(useDeleteLabelTag, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(4);

  result.current.mutate(1);
  await waitFor(() => expect(cache.findAll()).toHaveLength(3));
  expect(isInvalidated(["/label-tags/admin"])).toBe(true);
  expect(isInvalidated(["/labels/admin"])).toBe(true);
  expect(isInvalidated(["/labels/tags"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/label-tags/admin");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
