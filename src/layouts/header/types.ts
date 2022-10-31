type Link = { href: string; text: string };

export type _Props = {
  mainLinks: Array<Link>;
  subLinks: Array<Link>;
  moreLinks: Array<Link>;
  allLinks: Array<Link>;
  current: (href: string) => "page" | undefined;
  navigation: boolean;
  toggleNavigation: () => void;
};
