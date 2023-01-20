import { useNotificationState } from "@/hooks/notification";
import { render, screen } from "@testing-library/react";
import { AdminNotification } from ".";

jest.mock("@/hooks/notification", () => ({
  useNotificationState: jest.fn(),
  useNotificationAction: () => ({
    resetNotification: () => undefined,
  }),
}));

jest.mock("@/icons/circle-info", () => ({
  IconCircleInfo: () => "icon-info ",
}));

jest.mock("@/components/close-button", () => ({
  CloseButton: () => "close",
}));

const notification = useNotificationState as jest.Mock;

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

  expect(screen.getByText("icon-info foo")).toBeInTheDocument();
  expect(screen.getByText("close")).toBeInTheDocument();
});
