import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={props.className}>{props.total}</div>
);
