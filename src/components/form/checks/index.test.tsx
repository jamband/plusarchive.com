import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { FormChecks } from ".";

test("", () => {
  render(
    <FormChecks label="foo" inputClass="" feedback={undefined}>
      <input type="checkbox" />
    </FormChecks>,
  );

  const foo = screen.getByText("foo");
  expect(foo.nodeName).toBe("LABEL");

  const listbox = screen.getByRole("listbox");
  expect(listbox).toBeInTheDocument();
});

test("feedback", () => {
  render(
    <FormChecks label="foo" inputClass="" feedback="feedback...">
      <input type="checkbox" />
    </FormChecks>,
  );

  const foo = screen.getByText("foo");
  expect(foo.nodeName).toBe("LABEL");

  const listbox = screen.getByRole("listbox", { description: "feedback..." });
  expect(listbox).toBeInTheDocument();
});
