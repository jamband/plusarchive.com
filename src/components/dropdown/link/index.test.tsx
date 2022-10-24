import { render, screen } from "@testing-library/react";
import { DropdownLink } from ".";

test("", () => {
  render(<DropdownLink href="/foo">foo</DropdownLink>);

  const link = screen.getByRole("link", { name: "foo" });
  expect(link).toHaveAttribute("href", "/foo");
});
