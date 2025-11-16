import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DropdownHeader } from ".";

test("", () => {
  render(<DropdownHeader>foo</DropdownHeader>);

  const heading = screen.getByText("foo");
  expect(heading).toBeInTheDocument();
});
