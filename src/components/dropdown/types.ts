export type Props = {
  label?: string;
  className?: string;
  iconClass?: string;
  children: React.ReactNode;
};

export type _Props = Props & {
  onClick: (event: React.MouseEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
};
