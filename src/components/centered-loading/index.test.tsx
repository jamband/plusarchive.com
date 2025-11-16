import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CenteredLoading } from ".";

test("", () => {
  render(<CenteredLoading />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
});
