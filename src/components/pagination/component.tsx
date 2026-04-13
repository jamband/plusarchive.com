import Link from "next/link";
import { Fragment } from "react";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <nav
    className={`${styles.container} ${props.className || ""}`}
    aria-label="Page navigation"
  >
    <div className={styles.linkContainer}>
      {props.parts.map((part) => (
        <Fragment key={part}>
          {props.disabled(part) ? (
            <button
              type="button"
              className={styles.linkDisabled}
              aria-label={part}
              disabled
            >
              {props.icon(part)}
            </button>
          ) : (
            <Link
              href={props.href(part)}
              className={styles.link}
              aria-label={part}
            >
              {props.icon(part)}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
    <div
      className={styles.information}
      role="status"
      aria-label="Page information"
    >
      {props.pagination.currentPage}/{props.pagination.lastPage}
    </div>
  </nav>
);
