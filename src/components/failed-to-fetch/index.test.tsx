import { render, screen } from "@testing-library/react";
import { FailedToFetch } from ".";

test("", () => {
  render(<FailedToFetch />);

  const text = screen.getByText("An error occurred while fetching the data.");
  expect(text).toBeInTheDocument();
});

test("with a message", () => {
  render(<FailedToFetch message="foo" />);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
