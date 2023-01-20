import { fireEvent, render, screen } from "@testing-library/react";
import { CloseButton } from ".";

jest.mock("@/icons/xmark", () => ({
  IconXMark: () => "x",
}));

test("", () => {
  const onClick = jest.fn();

  render(<CloseButton className="foo" iconClass="bar" onClick={onClick} />);

  const button = screen.getByRole("button", { name: "Close" });
  expect(button).toHaveClass("foo", { exact: true });
  expect(button).toHaveTextContent("x");

  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
