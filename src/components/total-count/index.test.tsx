import { render, screen } from "@testing-library/react";
import { TotalCount } from ".";

test("total: 0", () => {
  render(<TotalCount total={0} />);

  const text = screen.getByText("No results found");
  expect(text).toBeInTheDocument();
});

test("total: 1000", () => {
  render(<TotalCount total={1000} />);

  const text = screen.getByText("1,000 results");
  expect(text).toBeInTheDocument();
});
