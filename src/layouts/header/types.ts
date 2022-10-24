type Link = { href: string; text: string };

export type _Props = {
  mainLinks: Array<Link>;
  subLinks: Array<Link>;
  moreLinks: Array<Link>;
  allLinks: Array<Link>;
  active: (href: string) => boolean;
  navigation: boolean;
  toggleNavigation: () => void;
};
