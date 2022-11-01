import Link from "next/link";
import { Fragment } from "react";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <nav className="text-center md:text-base" aria-label="Page navigation">
    <div className="flex justify-around gap-x-4">
      {props.parts.map((part) => (
        <Fragment key={part}>
          {props.disabled(part) ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              role="link"
              className="pointer-events-none z-10 w-full rounded py-2 text-gray-500"
              aria-label={part}
              aria-disabled={true}
              tabIndex={-1}
            >
              {props.icon(part)}
            </a>
          ) : (
            <Link
              href={props.href(part)}
              className="z-10 w-full rounded py-2 hover:bg-gray-500/10 hover:text-gray-100 active:bg-gray-500/10"
              aria-label={part}
            >
              {props.icon(part)}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
    <div
      className="relative bottom-[2.8em] text-xs md:bottom-[2.45em] md:text-sm"
      aria-label="Page information"
    >
      {props.pagination.currentPage}/{props.pagination.lastPage}
    </div>
  </nav>
);
