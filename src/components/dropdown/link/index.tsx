import { Component } from "./component";
import type { Props } from "./types";

export const DropdownLink: React.FC<Props> = (props) => {
  const resetScrollPosition = (event: React.MouseEvent<HTMLAnchorElement>) => {
    (event.currentTarget.parentNode as HTMLDivElement).scrollTop = 0;
  };

  return <Component {...props} resetScrollPosition={resetScrollPosition} />;
};
