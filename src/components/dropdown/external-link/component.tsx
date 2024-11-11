import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <a
    href={props.href}
    className={styles.container}
    target="_blank"
    rel="noreferrer"
  >
    <IconUpRightFromSquare className={styles.icon} />
    {props.children}
  </a>
);
