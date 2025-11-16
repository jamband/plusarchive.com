import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DropdownDivider } from ".";

test("", () => {
  render(<DropdownDivider />);

  const separator = screen.getByRole("separator");
  expect(separator).toBeInTheDocument();
});
