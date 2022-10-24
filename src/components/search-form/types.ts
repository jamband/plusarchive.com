export type Props = {
  className: string;
};

export type _Props = Props & {
  value: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
