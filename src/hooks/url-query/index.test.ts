import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { useUrlQuery } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

test("appendUrlQuery", () => {
  router.mockReturnValue({
    query: {
      foo: "foo_value",
      q: "q_value",
      page: 10,
    },
  });

  const { result } = renderHook(useUrlQuery);

  expect(result.current.appendUrlQuery("bar", "bar_value")).toEqual({
    foo: "foo_value",
    bar: "bar_value",
  });
});

test("resetUrlQuery", () => {
  router.mockReturnValue({
    query: {
      foo: "foo_value",
      bar: "bar_value",
      q: "q_value",
      page: 10,
    },
  });

  const { result } = renderHook(useUrlQuery);

  expect(result.current.resetUrlQuery("foo")).toEqual({ bar: "bar_value" });
});
