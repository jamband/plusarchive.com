import { csrfCookieHandler, server } from "@/mocks/server";
import { isInvalidated, queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
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

test("GET /labels/countries", async () => {
  server.use(
    http.get("*/labels/countries", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useLabelsCountries, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /labels/tags", async () => {
  server.use(
    http.get("*/labels/tags", () => {
      return HttpResponse.json([{ name: "foo" }]);
    }),
  );

  const { result } = renderHook(useLabelsTags, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ name: "foo" }]);
});

test("GET /labels/admin", async () => {
  router.mockReturnValue({
    query: {},
  });

  server.use(
    http.get("*/labels/admin", () => {
      return HttpResponse.json([{ id: 1 }]);
    }),
  );

  const { result } = renderHook(useLabelsAdmin, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual([{ id: 1 }]);

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);

  expect(queries[0].queryKey).toEqual([
    "/labels/admin",
    { name: "", country: "", tag: "", sort: "", page: "1" },
  ]);
});

test("GET /labels/[id]", async () => {
  router.mockReturnValue({
    query: { id: 1 },
  });

  server.use(
    http.get("*/labels/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
  );

  const { result } = renderHook(useLabel, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ id: 1 });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/labels", "1"]);
});

test("POST /labels", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/labels", () => {
      return HttpResponse.json({ id: 1 }, { status: 201 });
    }),
  );

  queryClient.setQueryData(["/labels/admin"], null);

  const { result } = renderHook(useCreateLabel, { wrapper });
  const cache = queryClient.getQueryCache();
  expect(cache.findAll()).toHaveLength(1);

  result.current.mutate({ body: {} });
  await waitFor(() => expect(cache.findAll()).toHaveLength(2));

  expect(queryClient.getQueryData(["/labels", "1"])).toEqual({ id: 1 });
  expect(isInvalidated(["/labels/admin"])).toBe(true);
  expect(useRouter().push).toHaveBeenCalledWith("/labels/1");
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("PUT /labels/[id]", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.put("*/labels/1", () => {
      return HttpResponse.json({ id: 1 });
    }),
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
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});

test("DELETE /labels/[id]", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  notificationAction.mockReturnValue({
    setNotification: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.delete("*/labels/1", () => {
      return new Response(null, { status: 204 });
    }),
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
  expect(useNotificationAction().setNotification).toHaveBeenCalledTimes(1);
});
