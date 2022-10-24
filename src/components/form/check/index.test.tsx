import { render, screen } from "@testing-library/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FormCheck } from ".";

test("", () => {
  render(<FormCheck value="bar" register={{} as UseFormRegisterReturn} />);

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("bar");
});
