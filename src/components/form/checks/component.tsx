import { FormFeedback } from "../feedback";
import { FormLabel } from "../label";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset className={props.className}>
    <FormLabel htmlFor="">{props.label}</FormLabel>
    <div
      className={`${props.inputClass} flex flex-wrap gap-3 overflow-scroll rounded border p-3`}
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
