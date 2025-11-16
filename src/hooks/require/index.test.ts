import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { useRequireAdmin, useRequireGuest } from ".";
import { useAuth } from "../auth";

vi.mock("../auth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const auth = useAuth as Mock;
const router = useRouter as Mock;

beforeEach(() => {
  auth.mockReset();
  router.mockReset();
});

test("useRequireGuest without role", () => {
  auth.mockReturnValue({ data: undefined });
  router.mockReturnValue({ push: vi.fn() });

  renderHook(useRequireGuest);
  expect(useRouter().push).toHaveBeenCalledTimes(0);
});

test("useRequireGuest with admin role", () => {
  auth.mockReturnValue({ data: { role: "admin" } });
  router.mockReturnValue({ push: vi.fn() });

  renderHook(useRequireGuest);
  expect(useRouter().push).toHaveBeenCalledWith("/admin");
});

test("useRequireAdmin without role", () => {
  auth.mockReturnValue({ data: undefined });
  router.mockReturnValue({ push: vi.fn() });

  renderHook(useRequireAdmin);
  expect(useRouter().push).toHaveBeenCalledWith("/");
});

test("useRequireGuest with admin role", () => {
  auth.mockReturnValue({ data: { role: "admin" } });
  router.mockReturnValue({ push: vi.fn() });

  renderHook(useRequireAdmin);
  expect(useRouter().push).toHaveBeenCalledTimes(0);
});
