import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button type="submit" disabled={props.disabled} className={styles.container}>
    {props.children}
  </button>
);
