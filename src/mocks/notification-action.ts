import { useNotificationAction } from "@/hooks/notification";

export const notificationAction = useNotificationAction as jest.Mock;

beforeEach(() => {
  notificationAction.mockReset();
});
