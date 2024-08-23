import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Link
    href={props.href}
    className="mx-2 my-0.5 inline-flex items-center rounded px-2 py-0.5 hover:bg-gray-700 hover:text-gray-100 active:bg-gray-700 active:text-gray-100"
    onClickCapture={props.resetScrollPosition}
  >
    {props.children}
  </Link>
);
