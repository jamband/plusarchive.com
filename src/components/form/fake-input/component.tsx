import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={`${styles.container} ${props.className || ""}`}>
    {props.children}
  </div>
);
