import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { AdminHeader } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

test("current: /admin", () => {
  router.mockReturnValue({ pathname: "/admin" });

  render(<AdminHeader />);

  const link = screen.getByRole("link", { current: "page" });
  expect(link).toHaveTextContent("Admin");
  expect(link).toHaveAttribute("href", "/admin");
});

test("current: /logout", () => {
  router.mockReturnValue({ pathname: "/admin/logout" });

  render(<AdminHeader />);

  const links = screen.getAllByRole("link", { current: "page" });
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveTextContent("Logout");
  expect(links[0]).toHaveAttribute("href", "/admin/logout");
  expect(links[1]).toHaveTextContent("Logout");
  expect(links[1]).toHaveAttribute("href", "/admin/logout");
});
