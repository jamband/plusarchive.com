import { router } from "@/mocks/router";
import { renderHook } from "@testing-library/react";
import { useUrlQuery } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("appendUrlQuery", () => {
  router.mockReturnValue({
    query: {
      foo: "foo_value",
      q: "q_value",
      page: 10,
    },
  });

  const { result } = renderHook(useUrlQuery);

  expect(result.current.appendUrlQuery("bar", "bar_value")).toStrictEqual({
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

  expect(result.current.resetUrlQuery("foo")).toStrictEqual({
    bar: "bar_value",
  });
});
