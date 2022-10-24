import { render, screen } from "@testing-library/react";
import { Loading } from ".";

test("", () => {
  render(<Loading />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status.childNodes[1]).toHaveClass("bg-gray-400 h-[7px] w-[7px]");
});

test("color", () => {
  render(<Loading color="bg-rose-500" />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status.childNodes[1]).not.toHaveClass("bg-gray-400");
  expect(status.childNodes[1]).toHaveClass("bg-rose-500");
});

test("size", () => {
  render(<Loading size="h-[5px] w-[5px]" />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status.childNodes[1]).not.toHaveClass("h-[7px] w-[7px]");
  expect(status.childNodes[1]).toHaveClass("h-[5px] w-[5px]");
});
