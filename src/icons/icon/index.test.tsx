import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Icon } from ".";

test("", () => {
  render(
    <Icon className="h-4 w-4" viewBox="0 0 20 20">
      icon
    </Icon>,
  );

  const image = screen.getByText("icon");
  expect(image).toHaveAttribute("viewBox", "0 0 20 20");
  expect(image).toHaveClass("h-4 w-4", { exact: true });
  expect(image).not.toHaveAccessibleName("img");
  expect(image).toHaveAttribute("role", "img");
  expect(image).toHaveAttribute("aria-hidden", "true");
});
