import { render, screen } from "@testing-library/react";
import { DropdownDivider } from ".";

test("", () => {
  render(<DropdownDivider />);

  const separator = screen.getByRole("separator");
  expect(separator).toBeInTheDocument();
});
