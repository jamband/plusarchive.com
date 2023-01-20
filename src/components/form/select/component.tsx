import { FailedToFetch } from "@/components/failed-to-fetch";
import { Loading } from "@/components/loading";
import { IconAngleDown } from "@/icons/angle-down";
import { FormFakeInput } from "../fake-input";
import { FormFeedback } from "../feedback";
import { FormLabel } from "../label";
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
        <div className="relative">
          <select
            id={props.id}
            className={`${props.inputClass} ${
              props.feedback
                ? "outline-none ring-1 ring-red-400 focus:ring"
                : ""
            }`}
            aria-required={props.required}
            aria-describedby={props.feedbackId}
            {...props.register}
          >
            {props.children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <IconAngleDown className="h-3 w-3" />
          </div>
        </div>
        {!!props.feedback && (
          <FormFeedback id={props.feedbackId} message={props.feedback} />
        )}
      </>
    )}
  </fieldset>
);
