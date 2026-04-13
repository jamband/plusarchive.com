import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { APP_NAME } from "@/constants/app";
import { Title } from ".";

vi.mock("next/head", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

test("title: ''", () => {
  render(<Title title="" />);

  expect(document.title).toBe(APP_NAME);
});

test("title: 'foo'", () => {
  render(<Title title="foo" />);

  expect(document.title).toBe(`foo ･ ${APP_NAME}`);
});
