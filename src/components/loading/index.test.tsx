import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Loading } from ".";

test("", () => {
  render(<Loading />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status.childNodes[1]).toHaveClass("dot1 color size");
});

test("color", () => {
  render(<Loading color="foo" />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status.childNodes[1]).toHaveClass("dot1 foo size");
});

test("color and size", () => {
  render(<Loading color="foo" size="bar" />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status.childNodes[1]).toHaveClass("dot1 foo bar");
});
