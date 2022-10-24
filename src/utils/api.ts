import type { ParsedUrlQuery } from "querystring";
import { API_CSRF_COOKIE, API_URL } from "~/constants/api";

export type Options = Pick<RequestInit, "headers"> & {
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown> | null;
};

export const http = async (resource: string, options?: Options) => {
  const csrfToken = () => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((_) => _.startsWith("XSRF-TOKEN")) || "";
    return decodeURIComponent(cookie.split("=")[1]);
  };

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (["POST", "PUT", "DELETE", "PATCH"].includes(options?.method || "")) {
    await fetch(`${API_URL}${API_CSRF_COOKIE}`, {
      credentials: "include",
    });

    headers["Content-Type"] = "application/json";
    headers["X-XSRF-TOKEN"] = csrfToken();
  }

  return fetch(`${API_URL}${resource}`, {
    method: options?.method || "GET",
    credentials: "include",
    headers: { ...headers, ...options?.headers },
    body: options?.body ? JSON.stringify(options.body) : null,
  });
};

export const searchParams = (query: ParsedUrlQuery, params: Array<string>) => {
  return new URLSearchParams(
    params.reduce(
      (previous, param) => ({
        ...previous,
        [param]: `${query[param] || ""}`,
      }),
      {}
    )
  );
};
