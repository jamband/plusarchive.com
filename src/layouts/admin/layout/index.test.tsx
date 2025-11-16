import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { AdminLayout } from ".";

vi.mock("@/layouts/loading", () => ({
  Loading: vi.fn(() => null),
}));

vi.mock("../notification", () => ({
  AdminNotification: vi.fn(() => null),
}));

vi.mock("../header", () => ({
  AdminHeader: vi.fn(() => null),
}));

vi.mock("../pages", () => ({
  AdminPages: vi.fn(() => null),
}));

vi.mock("../links", () => ({
  AdminLinks: vi.fn(() => null),
}));

vi.mock("../footer", () => ({
  AdminFooter: vi.fn(() => null),
}));

test("", () => {
  render(<AdminLayout title="foo">foo</AdminLayout>);

  const text = screen.getByText("foo");
  expect(text).toBeInTheDocument();
});
