import { useId } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const FormTextarea: React.FC<Props> = (props) => {
  const id = useId();

  return <Component {...props} id={id} feedbackId={`${id}-feedback`} />;
};
