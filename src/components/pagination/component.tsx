import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.FC<_Props> = (props) => (
  <nav className="text-center md:text-base" aria-label="Page navigation">
    <div className="flex justify-around gap-x-4">
      {props.parts.map((part) => (
        <Link key={part} href={props.href(part)}>
          <a
            className={`z-10 w-full rounded py-2 hover:bg-gray-500/10 hover:text-gray-100 ${
              props.disabled(part)
                ? "pointer-events-none text-gray-500"
                : "text-gray-400 active:bg-gray-500/10"
            }`}
            aria-label={part}
            aria-disabled={props.disabled(part)}
            tabIndex={props.disabled(part) ? -1 : 0}
          >
            {props.icon(part)}
          </a>
        </Link>
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
