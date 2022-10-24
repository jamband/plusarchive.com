import { render, screen } from "@testing-library/react";
import { APP_NAME } from "~/constants/app";
import { router } from "~/mocks/router";
import { Header } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("./search-form", () => ({
  HeaderSearchForm: () => null,
}));

test("links", () => {
  router.mockReturnValue({ pathname: "/" });

  render(<Header />);

  const links = screen.getAllByRole("link", { name: APP_NAME });
  expect(links[0]).toHaveAttribute("href", "/");
});

test("not active link styles", () => {
  router.mockReturnValue({ pathname: "/foo" });

  render(<Header />);

  const links = screen.getAllByRole("link");
  expect(links[1]).toHaveTextContent("Tracks");
  expect(links[1]).not.toHaveClass("bg-gray-600");
});

test("active link styles", () => {
  router.mockReturnValue({ pathname: "/tracks" });

  render(<Header />);

  const links = screen.getAllByRole("link");
  expect(links[1]).toHaveTextContent("Tracks");
  expect(links[1]).toHaveClass("bg-gray-600");
});
