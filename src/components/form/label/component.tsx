import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <label
    htmlFor={props.htmlFor}
    className={
      props.required ? "after:ml-1 after:text-red-400 after:content-['*']" : ""
    }
  >
    {props.children}
  </label>
);
