import { useId } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const Dropdown: React.FC<Props> = (props) => {
  const id = useId();

  const onClick = (event: React.FormEvent) => {
    const current = event.currentTarget;
    const firstChild = current.firstElementChild;

    if (current.hasAttribute("open")) {
      setTimeout(() => {
        current.removeAttribute("open");
        firstChild?.setAttribute("aria-expanded", "false");
      }, 100);
    } else {
      firstChild?.setAttribute("aria-expanded", "true");
    }
  };

  const onBlur = (event: React.FocusEvent) => {
    const current = event.currentTarget;
    const firstChild = current.firstElementChild;

    if (
      current.hasAttribute("open") &&
      id !== event.relatedTarget?.parentElement?.parentElement?.id
    ) {
      setTimeout(() => {
        current.removeAttribute("open");
        firstChild?.setAttribute("aria-expanded", "false");
      }, 100);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      const current = event.currentTarget;
      const firstChild = current.firstElementChild;

      if (current.hasAttribute("open")) {
        current.removeAttribute("open");
        firstChild?.setAttribute("aria-expanded", "false");
      }
    }
  };

  return (
    <Component
      {...props}
      id={id}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
