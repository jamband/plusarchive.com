import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className={`fixed z-50 h-1 w-0 bg-rose-500 ${
      props.state === "start"
        ? "w-[99%] bg-rose-500/60 transition-[width] duration-[10000ms] ease-[cubic-bezier(0.1,0.05,0,1)]"
        : ""
    } ${
      props.state === "complete"
        ? "w-[100%] bg-rose-500/80 transition-[width_0.1s_ease-out]"
        : ""
    }`}
    role="status"
  />
);
