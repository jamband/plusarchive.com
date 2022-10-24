import { FormFeedback } from "../feedback";
import { FormLabel } from "../label";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset className={props.className}>
    <FormLabel htmlFor={props.id} required={props.required}>
      {props.label}
    </FormLabel>
    <input
      type={props.type}
      id={props.id}
      className={`${props.inputClass} ${
        props.feedback ? "outline-none ring-1 ring-red-400 focus:ring" : ""
      }`}
      autoComplete={props.autoComplete}
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
