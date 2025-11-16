import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DetailColumn } from ".";

test("", () => {
  render(<DetailColumn>foo</DetailColumn>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
