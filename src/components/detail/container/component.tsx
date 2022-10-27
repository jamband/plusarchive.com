import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className={`grid grid-flow-col gap-0.5 text-sm leading-normal ${
      props.className || ""
    }`}
  >
    {props.children}
  </div>
);
