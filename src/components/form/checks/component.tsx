import { FormFeedback } from "../feedback";
import { FormLabel } from "../label";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset className={props.className}>
    <FormLabel htmlFor="">{props.label}</FormLabel>
    <div
      className={`${styles.listbox} ${props.inputClass}`}
      role="listbox"
      aria-describedby={props.feedbackId}
    >
      {props.children}
    </div>
    {!!props.feedback && (
      <FormFeedback id={props.feedbackId} message={props.feedback} />
    )}
  </fieldset>
);
