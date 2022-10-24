import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={props.className}>
    <span className="mr-1 text-red-400">*</span> is a required field.
    {props.children && <div>{props.children}</div>}
  </div>
);
