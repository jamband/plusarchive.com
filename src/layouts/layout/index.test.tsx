import { render, screen } from "@testing-library/react";
import { router } from "~/mocks/router";
import { Layout } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../loading", () => ({
  Loading: jest.fn(() => null),
}));

jest.mock("../notification", () => ({
  Notification: jest.fn(() => null),
}));

jest.mock("../header", () => ({
  Header: jest.fn(() => null),
}));

jest.mock("../footer", () => ({
  Footer: jest.fn(() => null),
}));

jest.mock("../player", () => ({
  Player: jest.fn(() => null),
}));

test("", () => {
  router.mockReturnValue({
    asPath: "/",
  });

  render(<Layout title="foo">foo</Layout>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
