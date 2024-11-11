import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <ul className={styles.container}>
    {props.links.map((link, index) => (
      <li key={index}>
        <a href={link} className={styles.link} target="_blank" rel="noreferrer">
          {props.icon(link).component}
          <span className="srOnly">{props.icon(link).name}</span>
        </a>
      </li>
    ))}
  </ul>
);
