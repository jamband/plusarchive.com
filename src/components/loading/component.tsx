import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={styles.container} role="status">
    <div className="srOnly">Loading...</div>
    <div
      className={`${styles.dot1} ${
        props.color || styles.color
      } ${props.size || styles.size}`}
    />
    <div
      className={`${styles.dot2} ${
        props.color || styles.color
      } ${props.size || styles.size}`}
    />
    <div
      className={`${styles.dot3} ${
        props.color || styles.color
      } ${props.size || styles.size}`}
    />
  </div>
);
