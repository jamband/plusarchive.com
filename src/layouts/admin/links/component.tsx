import { Dropdown } from "~/components/dropdown";
import { DropdownExternalLink } from "~/components/dropdown/external-link";
import { DropdownLink } from "~/components/dropdown/link";
import { APP_REPOSITORY_URL } from "~/constants/app";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Dropdown
    label="Links"
    className="px-3 py-1 text-sm hover:bg-gray-700 hover:text-gray-100 focus:bg-gray-700 md:text-base"
  >
    {props.hasActions ? (
      <>
        {props.links.map((link) => (
          <DropdownLink key={link.href} href={link.href}>
            {link.text}
          </DropdownLink>
        ))}
      </>
    ) : (
      <DropdownExternalLink href={APP_REPOSITORY_URL}>
        GitHub
      </DropdownExternalLink>
    )}
  </Dropdown>
);
