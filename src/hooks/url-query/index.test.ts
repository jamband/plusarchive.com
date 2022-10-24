import { renderHook } from "@testing-library/react";
import { router } from "~/mocks/router";
import { useUrlQuery } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("appendUrlQuery", () => {
  router.mockReturnValue({
    query: {
      foo: "foo",
      page: 10,
    },
  });

  const { result } = renderHook(useUrlQuery);

  expect(result.current.appendUrlQuery("bar", "bar")).toStrictEqual({
    foo: "foo",
    bar: "bar",
  });
});

test("resetUrlQuery", () => {
  router.mockReturnValue({
    query: {
      foo: "foo",
      bar: "bar",
      page: 10,
      q: "baz",
    },
  });

  const { result } = renderHook(useUrlQuery);

  expect(result.current.resetUrlQuery("foo")).toStrictEqual({
    bar: "bar",
  });
});
