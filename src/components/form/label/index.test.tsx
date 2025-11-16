import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { FormLabel } from ".";

test("", () => {
  render(<FormLabel htmlFor="foo">foo</FormLabel>);

  const label = screen.getByText("foo");
  expect(label).toBeInTheDocument();
  expect(label).not.toHaveClass("required");
});

test("required", () => {
  render(
    <FormLabel htmlFor="foo" required>
      foo
    </FormLabel>,
  );

  const label = screen.getByText("foo");
  expect(label).toBeInTheDocument();
  expect(label).toHaveClass("required");
});
