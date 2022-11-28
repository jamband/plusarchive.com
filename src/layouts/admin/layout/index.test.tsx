import { render, screen } from "@testing-library/react";
import { AdminLayout } from ".";

jest.mock("~/layouts/loading", () => ({
  Loading: jest.fn(() => null),
}));

jest.mock("../notification", () => ({
  AdminNotification: jest.fn(() => null),
}));

jest.mock("../header", () => ({
  AdminHeader: jest.fn(() => null),
}));

jest.mock("../pages", () => ({
  AdminPages: jest.fn(() => null),
}));

jest.mock("../links", () => ({
  AdminLinks: jest.fn(() => null),
}));

jest.mock("../footer", () => ({
  AdminFooter: jest.fn(() => null),
}));

test("", () => {
  render(<AdminLayout title="foo">foo</AdminLayout>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
