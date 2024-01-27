import { render, screen } from "@testing-library/react";
import { TagLinks } from ".";

test("", () => {
  render(<TagLinks data={["foo", "bar", "baz"]} pathname="/somewhere" />);

  const links = screen.getAllByRole("link");

  expect(links[0]).toHaveAttribute("href", "/somewhere?tag=foo");
  expect(links[0]).toHaveTextContent("foo");

  expect(links[1]).toHaveAttribute("href", "/somewhere?tag=bar");
  expect(links[1]).toHaveTextContent("bar");

  expect(links[2]).toHaveAttribute("href", "/somewhere?tag=baz");
  expect(links[2]).toHaveTextContent("baz");
});
