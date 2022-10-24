import type { Props as FeedbackProps } from "../feedback/types";

export type Props = {
  className?: string;
  label: string;
  inputClass: string;
  children: React.ReactNode;
  feedback: string | undefined;
};

export type _Props = Props & {
  id: string;
  feedbackId: FeedbackProps["id"];
};
