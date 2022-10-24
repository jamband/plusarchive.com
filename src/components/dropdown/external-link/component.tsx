import { ExternalLink } from "~/components/external-link";
import { IconUpRightFromSquare } from "~/icons/up-right-from-square";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <ExternalLink
    href={props.href}
    className="py-0.5 px-4 hover:bg-gray-700 hover:text-gray-100 active:bg-gray-700 active:text-gray-100"
  >
    <IconUpRightFromSquare className="mr-1.5 h-4 w-4 align-[-0.02em]" />
    {props.children}
  </ExternalLink>
);
