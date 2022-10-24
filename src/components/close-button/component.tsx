import { IconXMark } from "~/icons/xmark";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button
    type="button"
    className={props.className}
    onClick={props.onClick}
    aria-label="Close"
  >
    <IconXMark className={props.iconClass} />
  </button>
);
