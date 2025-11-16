import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { CloseButton } from ".";

vi.mock("@/icons/xmark", () => ({
  IconXMark: () => "x",
}));

test("", () => {
  const onClick = vi.fn();

  render(<CloseButton className="foo" iconClass="bar" onClick={onClick} />);

  const button = screen.getByRole("button", { name: "Close" });
  expect(button).toHaveClass("container foo", { exact: true });
  expect(button).toHaveTextContent("x");

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
