import { render } from "@testing-library/react";
import { APP_NAME } from "~/constants/app";
import { Title } from ".";

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("title: ''", () => {
  render(<Title title="" />);

  expect(document.title).toBe(APP_NAME);
});

test("title: 'foo'", () => {
  render(<Title title="foo" />);

  expect(document.title).toBe(`foo ･ ${APP_NAME}`);
});
