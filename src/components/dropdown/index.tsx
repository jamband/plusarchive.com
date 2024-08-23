import { Component } from "./component";
import type { Props } from "./types";

export const Dropdown: React.FC<Props> = (props) => {
  const onClick = (event: React.FormEvent) => {
    const current = event.currentTarget;
    const firstChild = current.firstElementChild;

    if (current.hasAttribute("open")) {
      firstChild?.setAttribute("aria-expanded", "false");
    } else {
      firstChild?.setAttribute("aria-expanded", "true");
    }

    if (
      event.target instanceof HTMLAnchorElement ||
      event.target instanceof HTMLButtonElement
    ) {
      current.removeAttribute("open");
    }
  };

  const onBlur = (event: React.FocusEvent) => {
    const current = event.currentTarget;
    const firstChild = current.firstElementChild;

    if (!current.contains(event.relatedTarget)) {
      current.removeAttribute("open");
      firstChild?.setAttribute("aria-expanded", "false");
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const current = event.currentTarget;
    const firstChild = current.firstElementChild;

    if (event.key === "Escape") {
      current.removeAttribute("open");
      firstChild?.setAttribute("aria-expanded", "false");
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
