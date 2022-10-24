import { render, screen } from "@testing-library/react";
import { ExternalLink } from ".";

test("", () => {
  render(<ExternalLink href="https://example.com">example</ExternalLink>);

  const link = screen.getByRole("link", { name: "example" });
  expect(link).toHaveAttribute("href", "https://example.com");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveAttribute("target", "_blank");
});
