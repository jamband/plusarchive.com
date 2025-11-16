import { APP_NAME } from "@/constants/app";
import { usePlayerState } from "@/hooks/player";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { Footer } from ".";

vi.mock("@/hooks/player", () => ({
  usePlayerState: vi.fn(),
  usePlayerAction: () => ({
    resetPlayer: () => undefined,
  }),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

const router = useRouter as Mock;
const playerState = usePlayerState as Mock;

beforeEach(() => {
  router.mockReset();
  playerState.mockReset();
});

test("route is /foo and empty player", () => {
  router.mockReturnValue({ pathname: "/foo" });
  playerState.mockReturnValue({ id: "" });

  render(<Footer />);

  const text = screen.getByText(APP_NAME);
  expect(text).toBeInTheDocument();
});

test("route is /tracks/[id] and empty player", () => {
  router.mockReturnValue({ pathname: "/tracks/[id]" });
  playerState.mockReturnValue({ id: "id1" });

  render(<Footer />);

  const text = screen.getByText(APP_NAME);
  expect(text).toBeInTheDocument();
});

test("route is /foo and not empty player", () => {
  router.mockReturnValue({ pathname: "/foo" });
  playerState.mockReturnValue({ id: "id1", type: "track", title: "title1" });

  render(<Footer />);

  const link = screen.getByRole("link", { name: "title1" });
  expect(link).toHaveAttribute("href", "/tracks/id1");

  const button = screen.getByRole("button", { name: "Close" });
  expect(button).toBeInTheDocument();
});
