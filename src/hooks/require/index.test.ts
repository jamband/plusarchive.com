import { auth } from "@/mocks/auth";
import { router } from "@/mocks/router";
import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import { useRequireAdmin, useRequireGuest } from ".";

jest.mock("../auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("useRequireGuest without role", () => {
  auth.mockReturnValue({ data: undefined });
  router.mockReturnValue({ push: jest.fn() });

  renderHook(useRequireGuest);
  expect(useRouter().push).toHaveBeenCalledTimes(0);
});

test("useRequireGuest with admin role", () => {
  auth.mockReturnValue({ data: { role: "admin" } });
  router.mockReturnValue({ push: jest.fn() });

  renderHook(useRequireGuest);
  expect(useRouter().push).toHaveBeenCalledWith("/admin");
});

test("useRequireAdmin without role", () => {
  auth.mockReturnValue({ data: undefined });
  router.mockReturnValue({ push: jest.fn() });

  renderHook(useRequireAdmin);
  expect(useRouter().push).toHaveBeenCalledWith("/");
});

test("useRequireGuest with admin role", () => {
  auth.mockReturnValue({ data: { role: "admin" } });
  router.mockReturnValue({ push: jest.fn() });

  renderHook(useRequireAdmin);
  expect(useRouter().push).toHaveBeenCalledTimes(0);
});
