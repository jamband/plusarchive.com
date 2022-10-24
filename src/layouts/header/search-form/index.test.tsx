import { render, screen } from "@testing-library/react";
import { router } from "~/mocks/router";
import { HeaderSearchForm } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/components/search-form", () => ({
  SearchForm: jest.fn(),
}));

test("enabled", () => {
  router.mockReturnValue({ pathname: "/foo" });
  render(<HeaderSearchForm />);

  const group = screen.getByRole("group");
  expect(group).toBeEnabled();
});

test("disabled", () => {
  router.mockReturnValue({ pathname: "/" });
  render(<HeaderSearchForm />);

  const group = screen.getByRole("group");
  expect(group).toBeDisabled();
});
