import { IconAngleDown } from "@/icons/angle-down";
import { IconEllipsis } from "@/icons/ellipsis";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <details
    onClick={props.onClick}
    onBlur={props.onBlur}
    onKeyDown={props.onKeyDown}
  >
    {/* biome-ignore lint/a11y/useSemanticElements: role="button" is required for testing-library getByRole */}
    <summary
      role="button"
      className={`${styles.button} ${props.className || ""}`}
      aria-label={props.label ? undefined : "More"}
    >
      {props.label ? (
        <div className={styles.label}>
          {props.label}
          <IconAngleDown
            className={`${styles.caret} ${props.iconClass || ""}`}
          />
        </div>
      ) : (
        <IconEllipsis className={styles.more} />
      )}
    </summary>
    <div className={styles.content}>{props.children}</div>
  </details>
);
