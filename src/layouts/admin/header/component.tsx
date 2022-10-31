import Link from "next/link";
import { IconBars } from "~/icons/bars";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <header className="w-full bg-gray-700 shadow-sm shadow-gray-900">
    <nav aria-label="Header navigation">
      <ul className="container mx-auto flex flex-wrap items-center justify-between gap-x-1">
        <li className="my-3 mr-4">
          <Link href="/admin">
            <a
              onClickCapture={() =>
                props.navigation && props.toggleNavigation()
              }
              className="rounded py-2 text-base font-bold text-gray-100"
            >
              Admin
            </a>
          </Link>
        </li>
        {props.links.map((link) => (
          <li
            key={link.href}
            className={`hidden md:block ${
              link.text === "Logout" ? "ml-auto" : ""
            }`}
          >
            <Link href={link.href}>
              <a className="rounded px-3 py-2 text-sm hover:bg-gray-600 hover:text-gray-100 active:bg-gray-600">
                {link.text}
              </a>
            </Link>
          </li>
        ))}
        <li className="ml-auto block md:hidden">
          <button
            type="button"
            onClick={props.toggleNavigation}
            className="-mr-2 rounded py-1 px-3 focus:bg-gray-600 focus:text-gray-100 aria-expanded:bg-gray-600 aria-expanded:text-gray-100"
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
          props.navigation ? "mb-3 max-h-[5rem]" : "max-h-0"
        }`}
      >
        {props.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <a
                className="my-0.5 block px-4 py-1 text-sm active:bg-gray-600 active:text-gray-100"
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
