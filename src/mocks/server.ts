import { API_CSRF_COOKIE } from "@/constants/api";
import { http } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer();

export const csrfCookieHandler = http.get(`*${API_CSRF_COOKIE}`, () => {
  return new Response(null, { status: 204 });
});
