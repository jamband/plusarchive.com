import { render, screen } from "@testing-library/react";
import { GridHeader } from ".";

test("", () => {
  render(<GridHeader>foo</GridHeader>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
