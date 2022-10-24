export type Props = {
  label?: string;
  className?: string;
  children: React.ReactNode;
};

export type _Props = Props & {
  id: string;
  onClick: (event: React.FormEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  open: boolean;
};
