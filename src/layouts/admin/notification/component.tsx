import { CloseButton } from "@/components/close-button";
import { IconCircleInfo } from "@/icons/circle-info";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className={styles.container}
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className={styles.iconContainer}>
      <IconCircleInfo className={styles.icon} />
    </div>
    <div className={styles.message}>{props.message}</div>
    <CloseButton
      className={styles.close}
      iconClass={styles.closeIcon}
      onClick={props.reset}
    />
  </div>
);
