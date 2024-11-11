import type { Props } from "./types";

export const Icon: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={props.viewBox}
    fill="currentColor"
    className={props.className}
    role="img"
    aria-hidden={true}
  >
    {props.children}
  </svg>
);
