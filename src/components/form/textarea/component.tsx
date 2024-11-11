import { FormFeedback } from "../feedback";
import { FormLabel } from "../label";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset className={props.className}>
    <FormLabel htmlFor={props.id} required={props.required}>
      {props.label}
    </FormLabel>
    <textarea
      id={props.id}
      className={`${props.inputClass} ${props.feedback ? styles.feedback : ""}`}
      placeholder={props.placeholder}
      aria-required={props.required}
      aria-describedby={props.feedbackId}
      {...props.register}
    />
    {!!props.feedback && (
      <FormFeedback id={props.feedbackId} message={props.feedback} />
    )}
  </fieldset>
);
