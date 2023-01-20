import { APP_NAME } from "@/constants/app";
import { playerState } from "@/mocks/player-state";
import { router } from "@/mocks/router";
import { render, screen } from "@testing-library/react";
import { Footer } from ".";

jest.mock("@/hooks/player", () => ({
  usePlayerState: jest.fn(),
  usePlayerAction: () => ({
    resetPlayer: () => undefined,
  }),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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
