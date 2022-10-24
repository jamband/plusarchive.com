import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className="bg-gray-600 px-4 py-2 font-semibold text-gray-100">
    {props.children}
  </div>
);
