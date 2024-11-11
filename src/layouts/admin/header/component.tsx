import { IconBars } from "@/icons/bars";
import Link from "next/link";
import styles from "./styles.module.css";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <header className={styles.container}>
    <nav aria-label="Header navigation">
      <ul className={styles.pc}>
        <li className={styles.adminLinkContainer}>
          <Link
            href="/admin"
            onClickCapture={() => props.navigation && props.toggleNavigation()}
            className={styles.adminLink}
            aria-current={props.current("/admin")}
          >
            Admin
          </Link>
        </li>
        {props.links.map((link) => (
          <li
            key={link.href}
            className={`${styles.linkContainer} ${
              link.text === "Logout" ? styles.linkContainerLogout : ""
            }`}
          >
            <Link
              href={link.href}
              className={styles.link}
              aria-current={props.current(link.href)}
            >
              {link.text}
            </Link>
          </li>
        ))}
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
        {props.links.map((link) => (
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
