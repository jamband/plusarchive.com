import type { UseFormRegisterReturn } from "react-hook-form";
import type { Props as FeedbackProps } from "../feedback/types";

export type Props = {
  label: string;
  className?: string;
  inputClass: string;
  register: UseFormRegisterReturn;
  feedback: string | undefined;
  placeholder?: string;
  required?: boolean;
};

export type _Props = Props & {
  id: string;
  feedbackId: FeedbackProps["id"];
};
