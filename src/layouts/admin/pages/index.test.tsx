import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { AdminPages } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

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
