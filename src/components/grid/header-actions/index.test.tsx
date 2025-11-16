import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { GridHeaderActions } from ".";

test("", () => {
  render(<GridHeaderActions />);

  const text = screen.getByText("Actions");
  expect(text).toBeInTheDocument();
});
