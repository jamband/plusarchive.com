import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={props.className}>
    <span className={styles.symbol}>*</span> is a required field.
    {props.children && <div>{props.children}</div>}
  </div>
);
