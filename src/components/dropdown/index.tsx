import { Component } from "./component";
import type { Props } from "./types";

export const Dropdown: React.FC<Props> = (props) => {
  const onClick = (event: React.FormEvent) => {
    if (
      event.target instanceof HTMLAnchorElement ||
      event.target instanceof HTMLButtonElement
    ) {
      event.currentTarget.removeAttribute("open");
    }
  };

  const onBlur = (event: React.FocusEvent) => {
    const current = event.currentTarget;

    if (!current.contains(event.relatedTarget)) {
      setTimeout(() => {
        current.removeAttribute("open");
      }, 100);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.currentTarget.removeAttribute("open");
    }
  };

  return (
    <Component
      {...props}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
