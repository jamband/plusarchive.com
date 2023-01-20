import { IconArrowDown19 } from "@/icons/arrow-down-1-9";
import { IconArrowDown91 } from "@/icons/arrow-down-9-1";
import { IconArrowDownAZ } from "@/icons/arrow-down-a-z";
import { IconArrowDownZA } from "@/icons/arrow-down-z-a";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <button type="button" onClick={props.sort}>
    {props.children}
    <span
      className={`ml-1 ${props.current ? "text-yellow-400" : "text-gray-500"}`}
    >
      {props.isAsc && props.type === "string" && (
        <IconArrowDownAZ className="h-4 w-4 align-[-0.125em]" />
      )}
      {props.isAsc && props.type === "number" && (
        <IconArrowDown19 className="h-4 w-4 align-[-0.125em]" />
      )}
      {!props.isAsc && props.type === "string" && (
        <IconArrowDownZA className="h-4 w-4 align-[-0.125em]" />
      )}
      {!props.isAsc && props.type === "number" && (
        <IconArrowDown91 className="h-4 w-4 align-[-0.125em]" />
      )}
    </span>
  </button>
);
