import { IconAngleDown } from "@/icons/angle-down";
import { IconEllipsis } from "@/icons/ellipsis";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <details
    id={props.id}
    className="inline-block"
    onClick={props.onClick}
    onBlur={props.onBlur}
    onKeyDown={props.onKeyDown}
  >
    <summary
      className={`group block cursor-pointer rounded ${props.className || ""}`}
      aria-expanded={false}
      aria-label={props.label ? undefined : "More"}
    >
      {props.label ? (
        <>
          <span className="mr-1.5">{props.label}</span>
          <IconAngleDown
            className={`h-3 w-3 align-[-0.075em] md:align-[0em] ${
              props.iconClass || ""
            }`}
          />
        </>
      ) : (
        <IconEllipsis className="h-4 w-4 align-[-0.125em]" />
      )}
    </summary>
    <div className="absolute z-20 -mb-0.5 mt-1 flex h-auto max-h-[352px] min-w-[10em] flex-col overflow-x-hidden rounded border border-gray-700 bg-gray-800 py-2 shadow-md shadow-gray-900">
      {props.children}
    </div>
  </details>
);
