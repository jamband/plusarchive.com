import { render, screen } from "@testing-library/react";
import { DropdownHeader } from ".";

test("", () => {
  render(<DropdownHeader>foo</DropdownHeader>);

  const heading = screen.getByRole("heading", { name: "foo" });
  expect(heading).toBeInTheDocument();
});
