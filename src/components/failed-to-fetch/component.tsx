import { IconCircleInfo } from "@/icons/circle-info";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div className={`text-amber-500 ${props.className || ""}`}>
    <IconCircleInfo className="mr-1 h-4 w-4 align-[-0.1em]" />
    {props.message}
  </div>
);
