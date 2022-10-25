import Link from "next/link";
import { Dropdown } from "~/components/dropdown";
import { DropdownDivider } from "~/components/dropdown/divider";
import { DropdownHeader } from "~/components/dropdown/header";
import { DropdownLink } from "~/components/dropdown/link";
import { APP_NAME } from "~/constants/app";
import { IconBars } from "~/icons/bars";
import { HeaderSearchForm } from "./search-form";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <header className="w-full bg-gray-700 shadow-sm shadow-gray-900">
    <nav aria-label="Header navigation">
      <ul className="container mx-auto flex flex-wrap items-center justify-between gap-x-2">
        <li className="my-3 mr-4">
          <Link href="/">
            <a
              onClickCapture={() =>
                props.navigation && props.toggleNavigation()
              }
              className="rounded py-2 text-base font-bold text-gray-100"
            >
              {APP_NAME}
            </a>
          </Link>
        </li>
        {props.mainLinks.map((link) => (
          <li key={link.href} className="hidden md:block">
            <Link href={link.href}>
              <a
                className={`rounded px-3 py-2 text-sm hover:bg-gray-600/50 hover:text-gray-100 ${
                  props.active(link.href)
                    ? "bg-gray-600 text-gray-100"
                    : "active:bg-gray-600"
                }`}
              >
                {link.text}
              </a>
            </Link>
          </li>
        ))}
        <li className="hidden md:block 2xl:hidden">
          <Dropdown className="px-3 py-0.5 hover:bg-gray-600/50 hover:text-gray-100 focus:bg-gray-600/50 focus:text-gray-100">
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
          <li key={link.href} className="hidden 2xl:block">
            <Link href={link.href}>
              <a
                className={`rounded px-3 py-2 text-sm hover:bg-gray-600/50 hover:text-gray-100 ${
                  props.active(link.href)
                    ? "bg-gray-600 text-gray-100"
                    : "active:bg-gray-600"
                }`}
              >
                {link.text}
              </a>
            </Link>
          </li>
        ))}
        <li className="hidden 2xl:block">
          <Dropdown className="px-3 py-0.5 hover:bg-gray-600/50 hover:text-gray-100 focus:bg-gray-600 focus:text-gray-100">
            <DropdownHeader>More Links</DropdownHeader>
            {props.moreLinks.map((link) => (
              <DropdownLink key={link.href} href={link.href}>
                {link.text}
              </DropdownLink>
            ))}
          </Dropdown>
        </li>
        <li className="ml-auto hidden md:block">
          <HeaderSearchForm />
        </li>
        <li className="ml-auto block md:hidden">
          <button
            type="button"
            onClick={props.toggleNavigation}
            className="-mr-2 rounded py-1 px-3 focus:bg-gray-600 focus:text-gray-100"
            aria-controls="header-navigation"
            aria-expanded={props.navigation}
            aria-label="Toggle navigation"
          >
            <IconBars className="h-4 w-4 align-[-0.125em]" />
          </button>
        </li>
      </ul>
      <ul
        id="header-navigation"
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          props.navigation ? "mb-3 max-h-[22rem]" : "max-h-0"
        }`}
      >
        {props.allLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <a
                className="block px-4 py-1 text-sm active:bg-rose-500 active:text-gray-100"
                onClickCapture={props.toggleNavigation}
              >
                {link.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);