import type { UseFormRegisterReturn } from "react-hook-form";
import type { useQuery } from "~/hooks/server-state";
import type { Props as FeedbackProps } from "../feedback/types";

export type Props = {
  label: string;
  className?: string;
  data: ReturnType<typeof useQuery>;
  inputClass: string;
  register: UseFormRegisterReturn;
  feedback: string | undefined;
  children: React.ReactNode;
  required?: boolean;
};

export type _Props = Props & {
  id: string;
  feedbackId: FeedbackProps["id"];
};
