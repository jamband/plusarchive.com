import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button
    type="submit"
    disabled={props.disabled}
    className={`rounded bg-rose-500 px-4 py-1 font-bold text-gray-100 shadow-sm shadow-gray-900 disabled:bg-gray-700 disabled:text-gray-400 ${
      props.disabled ? "cursor-not-allowed" : ""
    }`}
  >
    {props.children}
  </button>
);
