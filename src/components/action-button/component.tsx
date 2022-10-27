import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button
    type="button"
    className={`rounded px-4 py-1 ${props.className || ""}`}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);
