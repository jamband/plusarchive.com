import { APP_PRIMARY_COLOR } from "@/constants/app";
import { loading } from "@/mocks/player-loading";
import { playerState } from "@/mocks/player-state";
import { router } from "@/mocks/router";
import { render, screen } from "@testing-library/react";
import { Player } from ".";

jest.mock("@/hooks/player", () => ({
  usePlayerState: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/player-loading", () => ({
  usePlayerLoading: jest.fn(),
}));

jest.mock("@/icons/angle-left", () => ({
  IconAngleLeft: jest.fn(),
}));

test("", () => {
  playerState.mockReturnValue({ id: "" });
  router.mockReturnValue({});
  loading.mockReturnValue({});

  const { container } = render(<Player />);
  expect(container).toBeEmptyDOMElement();
});

test("hidden", () => {
  playerState.mockReturnValue({ id: "foo" });
  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const article = screen.getByRole("article", { hidden: true });
  expect(article).toBeInTheDocument();
});

test("visible", () => {
  playerState.mockReturnValue({ id: "foo" });
  router.mockReturnValue({ pathname: "/tracks/[id]" });
  loading.mockReturnValue({});

  render(<Player />);

  const article = screen.getByRole("article", { hidden: false });
  expect(article).toBeInTheDocument();
});

test("src and title for embed when track of Bandcamp", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "track",
    provider: "Bandcamp",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("Bandcamp player");
  expect(embed).toHaveAttribute(
    "src",
    `https://bandcamp.com/EmbeddedPlayer/track=key1/size=large/tracklist=false/bgcol=333333/linkcol=${APP_PRIMARY_COLOR}`,
  );
});

test("src and title for embed when playlist of Bandcamp", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "playlist",
    provider: "Bandcamp",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("Bandcamp player");
  expect(embed).toHaveAttribute(
    "src",
    `https://bandcamp.com/EmbeddedPlayer/album=key1/size=large/tracklist=false/bgcol=333333/linkcol=${APP_PRIMARY_COLOR}`,
  );
});

test("src and title for embed when track of SoundCloud", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "track",
    provider: "SoundCloud",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("SoundCloud player");
  expect(embed).toHaveAttribute(
    "src",
    `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/key1&show_comments=false&color=${APP_PRIMARY_COLOR}&hide_related=true&visual=true`,
  );
});

test("src and title for embed when playlist of SoundCloud", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "playlist",
    provider: "SoundCloud",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("SoundCloud player");
  expect(embed).toHaveAttribute(
    "src",
    `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/key1&show_comments=false&color=${APP_PRIMARY_COLOR}&hide_related=true&show_playcount=false`,
  );
});

test("src and title for embed when Vimeo", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "track",
    provider: "Vimeo",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("Vimeo player");
  expect(embed).toHaveAttribute("src", "https://player.vimeo.com/video/key1");
});

test("src and title for embed when track of YouTube", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "track",
    provider: "YouTube",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("YouTube player");
  expect(embed).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/key1?playsinline=1&rel=0",
  );
});

test("src and title for embed when playlist of YouTube", () => {
  playerState.mockReturnValue({
    id: "id1",
    type: "playlist",
    provider: "YouTube",
    provider_key: "key1",
  });

  router.mockReturnValue({});
  loading.mockReturnValue({});

  render(<Player />);

  const embed = screen.getByTitle("YouTube player");
  expect(embed).toHaveAttribute(
    "src",
    "https://www.youtube.com/embed/videoseries?list=key1&playsinline=1&rel=0",
  );
});

test("title and provider", () => {
  playerState.mockReturnValue({
    id: "foo",
    title: "title1",
    provider: "YouTube",
  });

  router.mockReturnValue({ pathname: "/tracks/[id]" });
  loading.mockReturnValue({});

  render(<Player />);

  expect(screen.getByRole("heading", { name: "title1" })).toBeInTheDocument();
  expect(screen.getByText("via YouTube")).toBeInTheDocument();
});

test("links when type is track", () => {
  playerState.mockReturnValue({
    id: "foo",
    type: "track",
  });

  router.mockReturnValue({ pathname: "/tracks/[id]" });
  loading.mockReturnValue({});

  render(<Player />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(2);

  const tracksLink = screen.getByRole("link", { name: "Back to Tracks" });
  expect(tracksLink).toHaveAttribute("href", "/tracks");

  const homeLink = screen.getByRole("link", { name: "Recent Favorites" });
  expect(homeLink).toHaveAttribute("href", "/");
});

test("links when type is playlist", () => {
  playerState.mockReturnValue({
    id: "foo",
    type: "playlist",
  });

  router.mockReturnValue({ pathname: "/tracks/[id]" });
  loading.mockReturnValue({});

  render(<Player />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(2);

  const playlistsLink = screen.getByRole("link", { name: "Back to Playlists" });
  expect(playlistsLink).toHaveAttribute("href", "/playlists");

  const homeLink = screen.getByRole("link", { name: "Recent Favorites" });
  expect(homeLink).toHaveAttribute("href", "/");
});
