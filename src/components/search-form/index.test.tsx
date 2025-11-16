import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { SearchForm } from ".";

const router = useRouter as Mock;

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

beforeEach(() => {
  router.mockReset();
});

test("", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
    push: vi.fn(),
  });

  render(<SearchForm className="" />);

  const searchbox = screen.getByRole("searchbox");
  expect(searchbox).toHaveValue("");

  fireEvent.change(searchbox, { target: { value: "bar" } });
  fireEvent.submit(searchbox);

  expect(useRouter().push).toHaveBeenCalledWith({
    pathname: "/foo/search",
    query: { q: "bar" },
  });

  expect(searchbox).toHaveValue("bar");
});
