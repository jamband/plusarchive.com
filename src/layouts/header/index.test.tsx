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

test("current: /", () => {
  router.mockReturnValue({ pathname: "/" });

  render(<Header />);

  const link = screen.getByRole("link", { current: "page" });
  expect(link).toHaveTextContent(APP_NAME);
  expect(link).toHaveAttribute("href", "/");
});

test("current: /tracks", () => {
  router.mockReturnValue({ pathname: "/tracks" });

  render(<Header />);

  const links = screen.getAllByRole("link", { current: "page" });
  expect(links[0]).toHaveTextContent("Tracks");
  expect(links[0]).toHaveAttribute("href", "/tracks");
  expect(links[1]).toHaveTextContent("Tracks");
  expect(links[1]).toHaveAttribute("href", "/tracks");
});
