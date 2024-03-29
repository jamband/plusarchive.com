import { APP_NAME } from "@/constants/app";
import { render, screen } from "@testing-library/react";
import { AdminFooter } from ".";

jest.mock("@/icons/lock", () => ({
  IconLock: () => "icon ",
}));

test("", () => {
  render(<AdminFooter />);

  const text = screen.getByText(`icon ${APP_NAME}`);
  expect(text).toBeInTheDocument();
});
