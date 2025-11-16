import { useNotificationState } from "@/hooks/notification";
import { render, screen } from "@testing-library/react";
import type { Mock } from "vitest";
import { beforeEach, expect, test, vi } from "vitest";
import { AdminNotification } from ".";

vi.mock("@/hooks/notification", () => ({
  useNotificationState: vi.fn(),
  useNotificationAction: () => ({
    resetNotification: () => undefined,
  }),
}));

vi.mock("@/icons/circle-info", () => ({
  IconCircleInfo: () => "icon-info ",
}));

vi.mock("@/components/close-button", () => ({
  CloseButton: () => "close",
}));

const notification = useNotificationState as Mock;

beforeEach(() => {
  notification.mockReset();
});

test("", () => {
  notification.mockReturnValue("");

  const { container } = render(<AdminNotification />);
  expect(container).toBeEmptyDOMElement();
});

test("show", () => {
  notification.mockReturnValue("foo");

  render(<AdminNotification />);

  expect(screen.getByText("icon-info")).toBeInTheDocument();
  expect(screen.getByText("foo")).toBeInTheDocument();
  expect(screen.getByText("close")).toBeInTheDocument();
});
