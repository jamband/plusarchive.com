import { IconCircleInfo } from "@/icons/circle-info";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={`${styles.container} ${props.className || ""}`}>
    <IconCircleInfo className={styles.icon} />
    {props.message}
  </div>
);
