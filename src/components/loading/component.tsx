import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className="flex gap-x-1" role="status">
    <div className="sr-only">Loading...</div>
    <div
      className={`animation-delay-100 animate-loading rounded-full ${
        props.color || "bg-gray-400"
      } ${props.size || "h-[7px] w-[7px]"}`}
    />
    <div
      className={`animation-delay-200 animate-loading rounded-full ${
        props.color || "bg-gray-400"
      } ${props.size || "h-[7px] w-[7px]"}`}
    />
    <div
      className={`animation-delay-300 animate-loading rounded-full ${
        props.color || "bg-gray-400"
      } ${props.size || "h-[7px] w-[7px]"}`}
    />
  </div>
);
