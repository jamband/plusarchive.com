import { CloseButton } from "@/components/close-button";
import { IconCircleInfo } from "@/icons/circle-info";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <div
    className="max-w-64 fixed left-3 right-3 top-3 z-50 mx-auto rounded border border-gray-600 bg-gray-700 px-5 py-3 text-gray-100 md:left-auto md:mx-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="flex gap-x-2">
      <div>
        <IconCircleInfo className="mr-1.5 h-4 w-4 align-[-0.125em]" />
        {props.message}
      </div>
      <CloseButton
        className="-mr-2 ml-auto rounded px-1 hover:bg-gray-600 active:bg-gray-600 active:text-rose-500"
        iconClass="h-5 w-5 align-[-0.25em]"
        onClick={props.reset}
      />
    </div>
  </div>
);
