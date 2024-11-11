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
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              role="link"
              className={styles.linkDisabled}
              aria-label={part}
              aria-disabled={true}
              tabIndex={-1}
            >
              {props.icon(part)}
            </a>
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
    <div className={styles.information} aria-label="Page information">
      {props.pagination.currentPage}/{props.pagination.lastPage}
    </div>
  </nav>
);
