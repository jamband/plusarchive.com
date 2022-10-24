import type { UseFormRegisterReturn } from "react-hook-form";
import type { Props as FeedbackProps } from "../feedback/types";

export type Props = {
  className?: string;
  label: string;
  type: "email" | "password" | "text";
  inputClass: string;
  register: UseFormRegisterReturn;
  feedback: string | undefined;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

export type _Props = Props & {
  id: string;
  feedbackId: FeedbackProps["id"];
};
