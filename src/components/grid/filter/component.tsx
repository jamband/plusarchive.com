import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className={`flex w-full justify-center bg-gray-700 ${
      props.className || ""
    }`}
  >
    {props.children}
  </div>
);
