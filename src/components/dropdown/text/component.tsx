import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <span className={`${styles.container} ${props.className || ""}`}>
    {props.children}
  </span>
);
