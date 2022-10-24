import { render, screen } from "@testing-library/react";
import { FormLabel } from ".";

test("", () => {
  render(
    <>
      <FormLabel htmlFor="foo">foo</FormLabel>
      <input id="foo" />
    </>
  );

  const textbox = screen.getByRole("textbox", { name: "foo" });
  expect(textbox).toBeInTheDocument();

  const label = screen.getByText("foo");
  expect(label).not.toHaveClass("after:content-['*']");
});

test("required", () => {
  render(
    <>
      <FormLabel htmlFor="foo" required>
        foo
      </FormLabel>
      <input id="foo" aria-required />
    </>
  );

  const textbox = screen.getByRole("textbox", { name: "foo" });
  expect(textbox).toBeInTheDocument();

  const label = screen.getByText("foo");
  expect(label).toHaveClass("after:content-['*']");
});
