import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <section className={`${styles.container} ${props.className || ""}`}>
    <div className={styles.title}>Tags:</div>
    <div
      ref={props.tagsRef}
      className={`${styles.links} ${
        props.tagsPosition === "right" ? styles.linksRight : ""
      } ${props.tagsPosition === "center" ? styles.linksCenter : ""} ${
        props.tagsPosition === "left" ? styles.linksLeft : ""
      }`}
      onScroll={props.tagsOnScroll}
    >
      {props.data.map((tag) => (
        <Link
          key={tag}
          href={{
            pathname: props.pathname,
            query: { tag },
          }}
          className={styles.link}
        >
          {tag}
        </Link>
      ))}
      <div className={styles.space}></div>
    </div>
  </section>
);
