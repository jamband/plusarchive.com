import { FailedToFetch } from "@/components/failed-to-fetch";
import { Loading } from "@/components/loading";
import { IconAngleDown } from "@/icons/angle-down";
import { FormFakeInput } from "../fake-input";
import { FormFeedback } from "../feedback";
import { FormLabel } from "../label";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <fieldset className={props.className}>
    <FormLabel htmlFor={props.id} required={props.required}>
      {props.label}
    </FormLabel>
    {props.data.isLoading && (
      <FormFakeInput className={props.inputClass}>
        <Loading />
      </FormFakeInput>
    )}
    {props.data.isError && <FailedToFetch />}
    {!!props.data.data && (
      <>
        <div className={styles.comboboxContainer}>
          <select
            id={props.id}
            className={`${props.inputClass} ${
              props.feedback ? styles.feedback : ""
            }`}
            aria-required={props.required}
            aria-describedby={props.feedbackId}
            {...props.register}
          >
            {props.children}
          </select>
          <div className={styles.caretContainer}>
            <IconAngleDown className={styles.caret} />
          </div>
        </div>
        {!!props.feedback && (
          <FormFeedback id={props.feedbackId} message={props.feedback} />
        )}
      </>
    )}
  </fieldset>
);
