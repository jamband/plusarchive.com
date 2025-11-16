import { APP_NAME } from "@/constants/app";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { AdminFooter } from ".";

vi.mock("@/icons/lock", () => ({
  IconLock: () => "icon ",
}));

test("", () => {
  render(<AdminFooter />);

  const text = screen.getByText(`icon ${APP_NAME}`);
  expect(text).toBeInTheDocument();
});
