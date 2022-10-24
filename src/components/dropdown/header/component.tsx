import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <h6 className="px-4 py-0.5 text-xs text-gray-500">
    <span className="border-b border-gray-500">{props.children}</span>
  </h6>
);
