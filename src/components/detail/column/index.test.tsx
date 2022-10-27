import { render, screen } from "@testing-library/react";
import { DetailColumn } from ".";

test("", () => {
  render(<DetailColumn>foo</DetailColumn>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
