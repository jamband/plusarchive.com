import type { UrlObject } from "node:url";

export type Props = {
  href: string | UrlObject;
  children: React.ReactNode;
};

export type _Props = Props & {
  resetScrollPosition: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};
