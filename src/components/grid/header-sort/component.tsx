import { IconArrowDown19 } from "@/icons/arrow-down-1-9";
import { IconArrowDown91 } from "@/icons/arrow-down-9-1";
import { IconArrowDownAZ } from "@/icons/arrow-down-a-z";
import { IconArrowDownZA } from "@/icons/arrow-down-z-a";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button type="button" className={styles.container} onClick={props.sort}>
    {props.children}
    {props.isAsc && props.type === "string" && (
      <IconArrowDownAZ
        className={`${styles.icon} ${props.current ? styles.active : styles.inactive}`}
      />
    )}
    {props.isAsc && props.type === "number" && (
      <IconArrowDown19
        className={`${styles.icon} ${props.current ? styles.active : styles.inactive}`}
      />
    )}
    {!props.isAsc && props.type === "string" && (
      <IconArrowDownZA
        className={`${styles.icon} ${props.current ? styles.active : styles.inactive}`}
      />
    )}
    {!props.isAsc && props.type === "number" && (
      <IconArrowDown91
        className={`${styles.icon} ${props.current ? styles.active : styles.inactive}`}
      />
    )}
  </button>
);
