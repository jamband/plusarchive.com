import { useId, useState } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const Dropdown: React.FC<Props> = (props) => {
  const id = useId();
  const [open, setOpen] = useState(false);

  const onClick = (event: React.FormEvent) => {
    event.stopPropagation();

    setTimeout(() => {
      setOpen((previous) => !previous);
    });
  };

  const onBlur = (event: React.FocusEvent) => {
    const element = event.relatedTarget?.parentNode?.parentNode as HTMLElement;

    if (open && id !== element?.id) {
      setTimeout(() => {
        setOpen(false);
      });
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (open && event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <Component
      {...props}
      id={id}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      open={open}
    />
  );
};
