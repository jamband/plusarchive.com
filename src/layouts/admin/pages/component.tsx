import { Dropdown } from "@/components/dropdown";
import { DropdownDivider } from "@/components/dropdown/divider";
import { DropdownLink } from "@/components/dropdown/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <Dropdown
    label={props.label}
    className={styles.container}
    iconClass={styles.icon}
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
