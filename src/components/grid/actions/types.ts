export type Props = {
  resource: string;
  id: number | string;
  mutation: () => boolean | void;
};

export type _Props = Props;
