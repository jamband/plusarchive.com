export type _Props = {
  links: Array<{ href: string; text: string }>;
  navigation: boolean;
  toggleNavigation: () => void;
  current: (href: string) => "page" | undefined;
};
