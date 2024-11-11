import { Dropdown } from "@/components/dropdown";
import { DropdownDivider } from "@/components/dropdown/divider";
import { DropdownHeader } from "@/components/dropdown/header";
import { DropdownLink } from "@/components/dropdown/link";
import { APP_NAME } from "@/constants/app";
import { IconBars } from "@/icons/bars";
import Link from "next/link";
import { HeaderSearchForm } from "./search-form";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <header className={styles.container}>
    <nav aria-label="Header navigation">
      <ul className={styles.pc}>
        <li className={styles.brandLinkContainer}>
          <Link
            href="/"
            onClickCapture={() => props.navigation && props.toggleNavigation()}
            className={styles.brandLink}
            aria-current={props.current("/")}
          >
            {APP_NAME}
          </Link>
        </li>
        {props.mainLinks.map((link) => (
          <li key={link.href} className={styles.mainLinkContainer}>
            <Link
              href={link.href}
              className={styles.mainLink}
              aria-current={props.current(link.href)}
            >
              {link.text}
            </Link>
          </li>
        ))}
        <li className={styles.subLinksAndMoreLinksDropdownContainer}>
          <Dropdown className={styles.subLinksAndMoreLinksDropdown}>
            <DropdownHeader>Sub Links</DropdownHeader>
            {props.subLinks.map((link) => (
              <DropdownLink key={link.href} href={link.href}>
                {link.text}
              </DropdownLink>
            ))}
            <DropdownDivider />
            <DropdownHeader>More Links</DropdownHeader>
            {props.moreLinks.map((link) => (
              <DropdownLink key={link.href} href={link.href}>
                {link.text}
              </DropdownLink>
            ))}
          </Dropdown>
        </li>
        {props.subLinks.map((link) => (
          <li key={link.href} className={styles.subLinkContainer}>
            <Link
              href={link.href}
              className={styles.subLink}
              aria-current={props.current(link.href)}
            >
              {link.text}
            </Link>
          </li>
        ))}
        <li className={styles.moreLinksDropdownContainer}>
          <Dropdown className={styles.moreLinksDropdown}>
            <DropdownHeader>More Links</DropdownHeader>
            {props.moreLinks.map((link) => (
              <DropdownLink key={link.href} href={link.href}>
                {link.text}
              </DropdownLink>
            ))}
          </Dropdown>
        </li>
        <li className={styles.searchFormContainer}>
          <HeaderSearchForm />
        </li>
        <li className={styles.menuContainer}>
          <button
            type="button"
            onClick={props.toggleNavigation}
            className={styles.menu}
            aria-controls="header-navigation"
            aria-expanded={props.navigation}
            aria-label="Toggle navigation"
          >
            <IconBars className={styles.menuIcon} />
          </button>
        </li>
      </ul>
      <ul
        id="header-navigation"
        className={`${styles.mobile} ${
          props.navigation ? styles.mobileActive : styles.mobileInactive
        }`}
      >
        {props.allLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={styles.mobileLink}
              aria-current={props.current(link.href)}
              onClickCapture={props.toggleNavigation}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);
