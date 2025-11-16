import { csrfCookieHandler, server } from "@/mocks/server";
import { queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { useAuth, useLogin, useLogout } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

test("GET /auth/user", async () => {
  server.use(
    http.get("*/auth/user", () => {
      return HttpResponse.json({ role: "foo" });
    }),
  );

  const { result } = renderHook(useAuth, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toEqual({ role: "foo" });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toEqual(["/auth/user"]);
});

test("POST /auth/login", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/auth/login", () => {
      return new Response(null, { status: 204 });
    }),
  );

  const { result } = renderHook(useLogin, { wrapper });
  result.current.mutate({ body: {} });
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith("/admin"));
});

test("POST /auth/logout", async () => {
  router.mockReturnValue({
    push: vi.fn(),
  });

  server.use(
    csrfCookieHandler,
    http.post("*/auth/logout", () => {
      return new Response(null, { status: 204 });
    }),
  );

  const { result } = renderHook(useLogout, { wrapper });
  result.current.mutate();
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith("/"));
});
