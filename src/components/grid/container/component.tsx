import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className={`grid gap-0.5 text-sm leading-normal ${props.className || ""}`}
  >
    {props.children}
  </div>
);
