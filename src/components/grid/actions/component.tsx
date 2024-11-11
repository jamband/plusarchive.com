import { IconEye } from "@/icons/eye";
import { IconPencil } from "@/icons/pencil";
import { IconTrash } from "@/icons/trash";
import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={styles.container}>
    <Link href={`${props.resource}/${props.id}`} className={styles.action}>
      <IconEye className={styles.icon} />
    </Link>
    <Link
      href={`${props.resource}/${props.id}/update`}
      className={styles.action}
    >
      <IconPencil className={styles.icon} />
    </Link>
    <button type="button" onClick={props.mutation} className={styles.action}>
      <IconTrash className={styles.icon} />
    </button>
  </div>
);
