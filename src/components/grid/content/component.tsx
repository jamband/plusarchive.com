import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={`bg-gray-700 px-4 py-2 ${props.className || ""}`}>
    {props.children}
  </div>
);
