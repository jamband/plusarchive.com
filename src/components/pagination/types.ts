import type { Pagination } from "@/types/pagination";
import type { UrlObject } from "url";

export type Part = "First" | "Previous" | "Next" | "Last";

export type Props = {
  className?: string;
  pagination: Pagination;
};

export type _Props = Props & {
  parts: Array<Part>;
  href: (part: Part) => string | UrlObject;
  disabled: (part: Part) => boolean;
  icon: (part: Part) => React.JSX.Element;
};
