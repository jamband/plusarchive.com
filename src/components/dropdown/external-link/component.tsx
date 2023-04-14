import { IconUpRightFromSquare } from "@/icons/up-right-from-square";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <a
    href={props.href}
    className="px-4 py-0.5 hover:bg-gray-700 hover:text-gray-100 active:bg-gray-700 active:text-gray-100"
    target="_blank"
    rel="noreferrer"
  >
    <IconUpRightFromSquare className="mr-1.5 h-4 w-4 align-[-0.02em]" />
    {props.children}
  </a>
);
