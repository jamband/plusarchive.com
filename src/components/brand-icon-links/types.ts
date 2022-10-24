export type Props = {
  links: string;
};

export type _Props = {
  links: Array<string>;
  icon: (link: string) => {
    name: string;
    component: JSX.Element;
  };
};
