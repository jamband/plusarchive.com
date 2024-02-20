import { Icon } from "./icon";
import type { _Props } from "./icon/types";

export const IconEllipsis: React.FC<_Props> = (props) => (
  <Icon className={props.className} viewBox="0 0 448 512">
    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
  </Icon>
);
