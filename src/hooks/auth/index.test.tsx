import { router } from "@/mocks/router";
import { csrfCookieHandler, server } from "@/mocks/server";
import { queryClient, wrapper } from "@/mocks/server-state";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { useRouter } from "next/router";
import "whatwg-fetch";
import { useAuth, useLogin, useLogout } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("GET /auth/user", async () => {
  server.use(
    rest.get("*/auth/user", (_, response, context) =>
      response(context.json({ role: "foo" }))
    )
  );

  const { result } = renderHook(useAuth, { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data).toStrictEqual({ role: "foo" });

  const queries = queryClient.getQueryCache().findAll();
  expect(queries).toHaveLength(1);
  expect(queries[0].queryKey).toStrictEqual(["/auth/user"]);
});

test("POST /auth/login", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/auth/login", (_, response, context) =>
      response(context.status(204))
    )
  );

  const { result } = renderHook(useLogin, { wrapper });
  result.current.mutate({ body: {} });
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith("/admin"));
});

test("POST /auth/logout", async () => {
  router.mockReturnValue({
    push: jest.fn(),
  });

  server.use(
    csrfCookieHandler,
    rest.post("*/auth/logout", (_, response, context) =>
      response(context.status(204))
    )
  );

  const { result } = renderHook(useLogout, { wrapper });
  result.current.mutate();
  await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith("/"));
});
