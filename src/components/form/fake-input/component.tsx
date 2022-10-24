import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className={`flex h-10 items-center rounded border px-3 ${
      props.className || ""
    }`}
  >
    {props.children}
  </div>
);
