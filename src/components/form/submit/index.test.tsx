import { render, screen } from "@testing-library/react";
import { FormSubmit } from ".";

test("", () => {
  render(<FormSubmit>foo</FormSubmit>);

  const button = screen.getByRole("button", { name: "foo" });
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toBeEnabled();
});

test("disabled", () => {
  render(<FormSubmit disabled>foo</FormSubmit>);

  const button = screen.getByRole("button", { name: "foo" });
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toBeDisabled();
});
