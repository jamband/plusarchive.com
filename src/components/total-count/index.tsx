import { Component } from "./component";
import type { Props } from "./types";

export const TotalCount: React.FC<Props> = (props) => {
  const total =
    props.total === 0
      ? "No results found"
      : `${new Intl.NumberFormat("en-US").format(props.total)} results`;

  return <Component total={total} className={props.className} />;
};
