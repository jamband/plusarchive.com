import { render, screen } from "@testing-library/react";
import { GridContent } from ".";

test("", () => {
  render(<GridContent>foo</GridContent>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
