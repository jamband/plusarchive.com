import { render, screen } from "@testing-library/react";
import { DetailContainer } from ".";

test("", () => {
  render(<DetailContainer className="">foo</DetailContainer>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
