import { render, screen } from "@testing-library/react";
import { BrandIconLinks } from ".";

test("empty link elements", () => {
  render(<BrandIconLinks links={""} />);

  const link = screen.queryByRole("link");
  expect(link).not.toBeInTheDocument();
});

test("links", () => {
  render(
    <BrandIconLinks
      links={"https://example.com/foo\nhttps://example.com/bar"}
    />,
  );

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
    "https://mixcloud.com/foo",
    "https://soundcloud.com/foo",
    "https://spotify.com/foo",
    "https://twitter.com/foo",
    "https://vimeo.com/foo",
    "https://www.youtube.com/foo",
  ];

  render(<BrandIconLinks links={linkValues.join("\n")} />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(linkValues.length);

  for (const i in linkValues) {
    expect(links[i]).toHaveAttribute("href", linkValues[i]);
  }

  const nameValues = [
    "Bandcamp",
    "Facebook",
    "Instagram",
    "Mixcloud",
    "SoundCloud",
    "Spotify",
    "Twitter",
    "Vimeo",
    "YouTube",
  ];

  for (const i in nameValues) {
    expect(screen.getByText(nameValues[i])).toBeInTheDocument();
  }
});

test("custom domains for Bandcamp", () => {
  const linkValues = [
    "https://fikarecordings.com",
    "https://mamabirdrecordingco.com",
    "https://maybemars.org",
    "https://souterraine.biz",
  ];

  render(<BrandIconLinks links={linkValues.join("\n")} />);

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(linkValues.length);

  for (const i in linkValues) {
    expect(links[i]).toHaveAttribute("href", linkValues[i]);
  }

  const texts = screen.getAllByText("Bandcamp");
  expect(texts).toHaveLength(linkValues.length);

  for (const i in linkValues) {
    expect(texts[i]).toBeInTheDocument();
  }
});
