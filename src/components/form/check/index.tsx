import { useId } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const FormCheck: React.FC<Props> = (props) => {
  const id = useId();

  return <Component {...props} id={id} />;
};
