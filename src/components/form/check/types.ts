import type { UseFormRegisterReturn } from "react-hook-form";

export type Props = {
  className?: string;
  value: string;
  register: UseFormRegisterReturn;
};

export type _Props = Props & {
  id: string;
};
