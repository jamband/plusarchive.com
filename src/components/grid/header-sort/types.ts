export type Props = {
  type: "string" | "number";
  column: string;
  children: React.ReactNode;
};

export type _Props = Props & {
  isAsc: boolean;
  current: boolean;
  sort: () => void;
};
