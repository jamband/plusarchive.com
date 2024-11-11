import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <label
    htmlFor={props.htmlFor}
    className={props.required ? styles.container : ""}
  >
    {props.children}
  </label>
);
