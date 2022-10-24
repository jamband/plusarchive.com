import { Component } from "./component";
import type { Props } from "./types";

export const FailedToFetch: React.FC<Props> = (props) => {
  const message = props.message ?? "An error occurred while fetching the data.";

  return <Component {...props} message={message} />;
};
