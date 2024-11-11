import { SearchForm } from "@/components/search-form";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset disabled={props.disabled}>
    <SearchForm
      className={`${styles.container} ${props.disabled ? styles.disabled : styles.enabled}`}
    />
  </fieldset>
);
