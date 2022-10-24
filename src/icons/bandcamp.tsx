import { Icon } from "./icon";
import type { _Props } from "./icon/types";

export const IconBandcamp: React.FC<_Props> = (props) => (
  <Icon className={props.className} viewBox="0 0 512 512">
    <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm48.2,326.1h-181L207.9,178h181Z" />
  </Icon>
);
