import { IconXMark } from "@/icons/xmark";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button
    type="button"
    className={`${styles.container} ${props.className}`}
    onClick={props.onClick}
    aria-label="Close"
  >
    <IconXMark className={props.iconClass} />
  </button>
);
