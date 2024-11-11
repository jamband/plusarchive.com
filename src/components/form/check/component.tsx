import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={props.className}>
    <input
      type="checkbox"
      id={`${props.id}-${props.value}`}
      className={styles.input}
      value={props.value}
      {...props.register}
    />
    <label
      htmlFor={`${props.id}-${props.value}`}
      className={styles.button}
      role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
    >
      {props.value}
    </label>
  </div>
);
