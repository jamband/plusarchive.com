import { render, screen } from "@testing-library/react";
import { BrandIconLinks } from ".";

test("empty link elements", () => {
  render(<BrandIconLinks links={""} />);

  const link = screen.queryByRole("link");
  expect(link).not.toBeInTheDocument();
});

test("links", () => {
  const linkValues = ["https://example.com/foo", "https://example.com/bar"];

  render(<BrandIconLinks links={linkValues.join("\n")} />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "https://example.com/foo");
  expect(links[0]).toHaveAttribute("rel", "noreferrer");
  expect(links[0]).toHaveAttribute("target", "_blank");
  expect(links[1]).toHaveAttribute("href", "https://example.com/bar");
  expect(links[1]).toHaveAttribute("rel", "noreferrer");
  expect(links[1]).toHaveAttribute("target", "_blank");
});

test("links that don't match as a brand", () => {
  render(
    <BrandIconLinks
      links={"https://example.com/foo\nhttps://example.com/bar"}
    />,
  );

  const texts = screen.getAllByText("External");
  expect(texts).toHaveLength(2);
});

test("brand icon links", () => {
  const linkValues = [
    "https://bandcamp.com/foo",
    "https://facebook.com/foo",
    "https://instagram.com/foo",
    "https://soundcloud.com/foo",
    "https://spotify.com/foo",
    "https://twitter.com/foo",
    "https://vimeo.com/foo",
    "https://x.com/foo",
    "https://www.youtube.com/foo",
  ];

  render(<BrandIconLinks links={linkValues.join("\n")} />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(9);

  expect(links[0]).toHaveAttribute("href", "https://bandcamp.com/foo");
  expect(links[0]).toHaveTextContent("Bandcamp");
  expect(links[1]).toHaveAttribute("href", "https://facebook.com/foo");
  expect(links[1]).toHaveTextContent("Facebook");
  expect(links[2]).toHaveAttribute("href", "https://instagram.com/foo");
  expect(links[2]).toHaveTextContent("Instagram");
  expect(links[3]).toHaveAttribute("href", "https://soundcloud.com/foo");
  expect(links[3]).toHaveTextContent("SoundCloud");
  expect(links[4]).toHaveAttribute("href", "https://spotify.com/foo");
  expect(links[4]).toHaveTextContent("Spotify");
  expect(links[5]).toHaveAttribute("href", "https://twitter.com/foo");
  expect(links[5]).toHaveTextContent("X");
  expect(links[6]).toHaveAttribute("href", "https://vimeo.com/foo");
  expect(links[6]).toHaveTextContent("Vimeo");
  expect(links[7]).toHaveAttribute("href", "https://x.com/foo");
  expect(links[7]).toHaveTextContent("X");
  expect(links[8]).toHaveAttribute("href", "https://www.youtube.com/foo");
  expect(links[8]).toHaveTextContent("YouTube");
});

test("custom domains for Bandcamp", () => {
  const linkValues = [
    "https://fikarecordings.com",
    "https://mamabirdrecordingco.com",
    "https://maybemars.org",
    "https://souterraine.biz",
    "https://wrwtfww.com",
  ];

  render(<BrandIconLinks links={linkValues.join("\n")} />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(5);

  expect(links[0]).toHaveAttribute("href", "https://fikarecordings.com");
  expect(links[0]).toHaveTextContent("Bandcamp");
  expect(links[1]).toHaveAttribute("href", "https://mamabirdrecordingco.com");
  expect(links[1]).toHaveTextContent("Bandcamp");
  expect(links[2]).toHaveAttribute("href", "https://maybemars.org");
  expect(links[2]).toHaveTextContent("Bandcamp");
  expect(links[3]).toHaveAttribute("href", "https://souterraine.biz");
  expect(links[3]).toHaveTextContent("Bandcamp");
  expect(links[4]).toHaveAttribute("href", "https://wrwtfww.com");
  expect(links[4]).toHaveTextContent("Bandcamp");
});
