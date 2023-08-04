import { render, screen } from "@testing-library/react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FormTextarea } from ".";

test("", () => {
  render(
    <FormTextarea
      label="foo"
      inputClass=""
      register={{} as UseFormRegisterReturn}
      feedback={undefined}
    />,
  );

  const textbox = screen.getByRole("textbox", { name: "foo" });
  expect(textbox).not.toBeRequired();
  expect(textbox).toHaveClass("", { exact: true });
});

test("required", () => {
  render(
    <FormTextarea
      label="foo"
      inputClass=""
      register={{} as UseFormRegisterReturn}
      feedback={undefined}
      required
    />,
  );

  const textbox = screen.getByRole("textbox", { name: "foo" });
  expect(textbox).toBeRequired();
});

test("feedback", () => {
  render(
    <FormTextarea
      label="foo"
      inputClass=""
      register={{} as UseFormRegisterReturn}
      feedback="feedback..."
    />,
  );

  const textbox = screen.getByRole("textbox", {
    name: "foo",
    description: "feedback...",
  });

  expect(textbox).toHaveClass("ring-red-400");
});
