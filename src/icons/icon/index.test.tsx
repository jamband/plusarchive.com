import { render, screen } from "@testing-library/react";
import { Icon } from ".";

test("", () => {
  render(
    <Icon className="h-4 w-4" viewBox="0 0 20 20">
      icon
    </Icon>,
  );

  const image = screen.getByText("icon");
  expect(image).toHaveAttribute("viewBox", "0 0 20 20");
  expect(image).toHaveClass("inline-block h-4 w-4", { exact: true });
  expect(image).not.toHaveAccessibleName("img");
  expect(image).toHaveAttribute("role", "img");
  expect(image).toHaveAttribute("aria-hidden", "true");
});
