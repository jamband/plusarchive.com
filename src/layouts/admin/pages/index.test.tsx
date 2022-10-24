import { render, screen } from "@testing-library/react";
import { router } from "~/mocks/router";
import { AdminPages } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("pathname: /", () => {
  router.mockReturnValue({ pathname: "/" });

  render(<AdminPages />);

  const button = screen.getByRole("button", { name: "Pages" });
  expect(button).toBeInTheDocument();
});

test("pathname: /foo", () => {
  router.mockReturnValue({ pathname: "/foo" });

  render(<AdminPages />);

  const button = screen.getByRole("button", { name: "Pages" });
  expect(button).toBeInTheDocument();
});

test("pathname: /tracks/admin", () => {
  router.mockReturnValue({ pathname: "/tracks/admin" });

  render(<AdminPages />);

  const button = screen.getByRole("button", { name: "Tracks" });
  expect(button).toBeInTheDocument();
});

test("pathname: /track-genres/admin", () => {
  router.mockReturnValue({ pathname: "/track-genres/admin" });

  render(<AdminPages />);

  const button = screen.getByRole("button", { name: "TrackGenres" });
  expect(button).toBeInTheDocument();
});
