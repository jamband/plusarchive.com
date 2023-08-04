import { API_CSRF_COOKIE } from "@/constants/api";
import { queryClient } from "@/mocks/server-state";
import { rest } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer();

export const csrfCookieHandler = rest.get(
  `*${API_CSRF_COOKIE}`,
  (_, response, context) => response(context.status(204)),
);

beforeEach(() => {
  server.listen();
  queryClient.clear();
});
