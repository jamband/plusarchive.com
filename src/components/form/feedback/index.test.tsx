import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { FormFeedback } from ".";

test("", () => {
  render(<FormFeedback id="foo-feedback" message="bar" />);

  const text = screen.getByText("bar");
  expect(text).toBeInTheDocument();
});
