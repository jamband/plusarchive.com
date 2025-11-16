import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { Layout } from ".";

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../loading", () => ({
  Loading: vi.fn(() => null),
}));

vi.mock("../header", () => ({
  Header: vi.fn(() => null),
}));

vi.mock("../footer", () => ({
  Footer: vi.fn(() => null),
}));

vi.mock("../player", () => ({
  Player: vi.fn(() => null),
}));

const router = useRouter as Mock;

beforeEach(() => {
  router.mockReset();
});

test("", () => {
  router.mockReturnValue({
    asPath: "/",
  });

  render(<Layout title="foo">foo</Layout>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
