import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ActionButton } from ".";

test("", () => {
  const onClick = vi.fn();

  render(<ActionButton onClick={onClick}>foo</ActionButton>);

  const button = screen.getByRole("button", { name: "foo" });
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
