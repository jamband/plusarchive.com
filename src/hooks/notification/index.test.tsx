import { act, renderHook } from "@testing-library/react";
import { NotificationProvider } from "~/contexts/notification";
import { useNotificationAction, useNotificationState } from ".";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NotificationProvider>{children}</NotificationProvider>
);

test("initial state", () => {
  const { result } = renderHook(useNotificationState, { wrapper });
  expect(result.current).toBe("");
});

test("setNotification", () => {
  const { result } = renderHook(
    () => {
      const state = useNotificationState();
      const { setNotification } = useNotificationAction();

      return {
        state,
        setNotification,
      };
    },
    { wrapper }
  );

  expect(result.current.state).toBe("");

  act(() => result.current.setNotification("foo"));
  expect(result.current.state).toBe("foo");
});

test("resetPlayer", () => {
  const { result } = renderHook(
    () => {
      const state = useNotificationState();
      const { setNotification, resetNotification } = useNotificationAction();

      return {
        state,
        setNotification,
        resetNotification,
      };
    },
    { wrapper }
  );

  act(() => result.current.setNotification("foo"));
  expect(result.current.state).toBe("foo");

  act(result.current.resetNotification);
  expect(result.current.state).toBe("");
});
