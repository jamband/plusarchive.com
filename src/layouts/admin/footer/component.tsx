import { APP_NAME } from "@/constants/app";
import { IconLock } from "@/icons/lock";
import styles from "./styles.module.css";

export const Component: React.FC = () => (
  <footer className={styles.container}>
    <div className={styles.main}>
      <IconLock className={styles.mainIcon} />
      {APP_NAME}
    </div>
  </footer>
);
