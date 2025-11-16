import { APP_NAME } from "@/constants/app";
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { AdminTitle } from ".";

vi.mock("next/head", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

test("title: ''", () => {
  render(<AdminTitle title="" />);

  expect(document.title).toBe(APP_NAME);
});

test("title: 'foo'", () => {
  render(<AdminTitle title="foo" />);

  expect(document.title).toBe(`foo ･ ${APP_NAME}`);
});
