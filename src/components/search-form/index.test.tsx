import { router } from "@/mocks/router";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SearchForm } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
    push: jest.fn(),
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
