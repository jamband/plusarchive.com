import { playerState } from "@/mocks/player-state";
import { router } from "@/mocks/router";
import type { Track } from "@/types/tracks";
import { render, screen } from "@testing-library/react";
import { TrackCard } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/player", () => ({
  usePlayerState: jest.fn(),
}));

jest.mock("@/icons/circle-pause", () => ({
  IconCirclePause: () => "status:pause",
}));

jest.mock("@/icons/circle-play", () => ({
  IconCirclePlay: () => "status:play",
}));

const track: Track = {
  id: "",
  url: "",
  provider: "Bandcamp",
  provider_key: "",
  title: "title1",
  image: "",
  genres: ["genre1", "genre2"],
  created_at: "",
};

test("aspect ratio: Bandcamp", () => {
  router.mockReturnValue({ query: { provider: "Bandcamp" } });
  playerState.mockReturnValue({ id: "id1" });

  render(<TrackCard track={track}>foo</TrackCard>);

  const img = screen.getByRole("img");
  expect(img).toHaveClass("squareAspectRatio");
});

test("aspect ratio: SoundCloud", () => {
  router.mockReturnValue({ query: { provider: "SoundCloud" } });
  playerState.mockReturnValue({ id: "id1" });

  render(<TrackCard track={track}>foo</TrackCard>);

  const img = screen.getByRole("img");
  expect(img).toHaveClass("squareAspectRatio");
});

test("aspect ratio: Vimeo", () => {
  router.mockReturnValue({ query: { provider: "Vimeo" } });
  playerState.mockReturnValue({ id: "id1" });

  render(<TrackCard track={track}>foo</TrackCard>);

  const img = screen.getByRole("img");
  expect(img).toHaveClass("videoAspectRatio");
});

test("aspect ratio: YouTube", () => {
  router.mockReturnValue({ query: { provider: "YouTube" } });
  playerState.mockReturnValue({ id: "id1" });

  render(<TrackCard track={track}>foo</TrackCard>);

  const img = screen.getByRole("img");
  expect(img).toHaveClass("videoAspectRatio");
});

test("status: play", () => {
  router.mockReturnValue({ query: {} });
  playerState.mockReturnValue({ id: "id1" });

  render(<TrackCard track={{ ...track, id: "id2" }}>foo</TrackCard>);

  const status = screen.getByText("status:play");
  expect(status).toBeInTheDocument();
});

test("status: pause", () => {
  router.mockReturnValue({ query: {} });
  playerState.mockReturnValue({ id: "id1" });

  render(<TrackCard track={{ ...track, id: "id1" }}>foo</TrackCard>);

  const status = screen.getByText("status:pause");
  expect(status).toBeInTheDocument();
});

test("children", () => {
  router.mockReturnValue({ query: {} });
  playerState.mockReturnValue({ id: "id1" });

  render(
    <TrackCard track={track}>
      <button type="button">button</button>
    </TrackCard>,
  );

  const buttons = screen.getAllByRole("button", { name: "button" });
  expect(buttons.length).toBe(2);
});
