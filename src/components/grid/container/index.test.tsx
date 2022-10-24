import { render, screen } from "@testing-library/react";
import { GridContainer } from ".";

test("", () => {
  render(<GridContainer>foo</GridContainer>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
