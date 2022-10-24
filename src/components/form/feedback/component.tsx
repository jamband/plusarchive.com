import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <p id={props.id} className="mt-1 text-sm leading-normal text-red-400">
    {props.message}
  </p>
);
