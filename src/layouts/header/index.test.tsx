import { APP_NAME } from "@/constants/app";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { Header } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("./search-form", () => ({
  HeaderSearchForm: () => null,
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

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
