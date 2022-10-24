import { render, screen } from "@testing-library/react";
import { GridFilter } from ".";

test("", () => {
  render(<GridFilter>foo</GridFilter>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});

test("empty", () => {
  const {
    container: { firstChild },
  } = render(<GridFilter />);

  expect(firstChild).toBeEmptyDOMElement();
});
