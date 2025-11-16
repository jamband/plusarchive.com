import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { HeaderSearchForm } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/components/search-form", () => ({
  SearchForm: vi.fn(),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

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
