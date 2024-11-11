import { CloseButton } from "@/components/close-button";
import { APP_NAME } from "@/constants/app";
import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <footer className={styles.container}>
    {props.player.id !== "" && !props.isPlayerVisible ? (
      <div className={styles.active}>
        <Link
          href={`/${props.player.type}s/${props.player.id}`}
          className={styles.link}
        >
          {props.player.title}
        </Link>
        <CloseButton
          className={styles.close}
          iconClass={styles.closeIcon}
          onClick={props.resetPlayer}
        />
      </div>
    ) : (
      <div className={styles.inactive}>{APP_NAME}</div>
    )}
  </footer>
);
