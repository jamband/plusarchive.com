import { Dropdown } from "~/components/dropdown";
import { DropdownDivider } from "~/components/dropdown/divider";
import { DropdownLink } from "~/components/dropdown/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Dropdown
    label={props.label}
    className="px-3 py-1 text-sm hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 md:text-base"
  >
    <DropdownLink href="/admin">Admin</DropdownLink>
    <DropdownDivider />
    {props.pages.map((page) => (
      <DropdownLink key={page.href} href={page.href}>
        {page.text}
      </DropdownLink>
    ))}
  </Dropdown>
);
