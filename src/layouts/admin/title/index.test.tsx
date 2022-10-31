import { render } from "@testing-library/react";
import { APP_NAME } from "~/constants/app";
import { AdminTitle } from ".";

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("title: ''", () => {
  render(<AdminTitle title="" />);

  expect(document.title).toBe(APP_NAME);
});

test("title: 'foo'", () => {
  render(<AdminTitle title="foo" />);

  expect(document.title).toBe(`foo ･ ${APP_NAME}`);
});
