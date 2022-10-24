import { render, screen } from "@testing-library/react";
import { DropdownExternalLink } from ".";

test("", () => {
  render(
    <DropdownExternalLink href="https://example.com">foo</DropdownExternalLink>
  );

  const link = screen.getByRole("link", { name: "foo" });
  expect(link).toHaveAttribute("href", "https://example.com");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  expect(link).toHaveAttribute("target", "_blank");
});
