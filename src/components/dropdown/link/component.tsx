import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Link
    href={props.href}
    className={styles.container}
    onClickCapture={props.resetScrollPosition}
  >
    {props.children}
  </Link>
);
