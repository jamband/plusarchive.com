import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <span className={`px-4 py-0.5 text-sm ${props.className || ""}`}>
    {props.children}
  </span>
);
