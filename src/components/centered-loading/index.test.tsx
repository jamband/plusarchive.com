import { render, screen } from "@testing-library/react";
import { CenteredLoading } from ".";

test("", () => {
  render(<CenteredLoading />);

  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
});
