import { render, screen } from "@testing-library/react";
import { FormFakeInput } from ".";

test("", () => {
  render(<FormFakeInput>foo</FormFakeInput>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
