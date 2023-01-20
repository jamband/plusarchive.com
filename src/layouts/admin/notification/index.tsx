import {
  useNotificationAction,
  useNotificationState,
} from "@/hooks/notification";
import { Component } from "./component";

export const AdminNotification: React.FC = () => {
  const notification = useNotificationState();
  const { resetNotification } = useNotificationAction();

  if (notification === "") {
    return null;
  }

  setTimeout(() => {
    resetNotification();
  }, 5000);

  return <Component message={notification} reset={resetNotification} />;
};
