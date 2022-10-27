import { render, screen } from "@testing-library/react";
import { DetailContainer } from ".";

test("", () => {
  render(<DetailContainer>foo</DetailContainer>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
