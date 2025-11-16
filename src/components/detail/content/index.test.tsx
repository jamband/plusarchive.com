import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DetailContent } from ".";

test("", () => {
  render(<DetailContent>foo</DetailContent>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
