import { render, screen } from "@testing-library/react";
import { FormInformation } from ".";

test("", () => {
  render(<FormInformation />);

  expect(screen.getByText("*")).toBeInTheDocument();
  expect(screen.getByText("is a required field.")).toBeInTheDocument();
});

test("with children", () => {
  render(<FormInformation>foo</FormInformation>);

  expect(screen.getByText("*")).toBeInTheDocument();
  expect(screen.getByText("is a required field.")).toBeInTheDocument();
  expect(screen.getByText("foo")).toBeInTheDocument();
});
