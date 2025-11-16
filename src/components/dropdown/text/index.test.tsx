import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DropdownText } from ".";

test("", () => {
  render(<DropdownText>foo</DropdownText>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
