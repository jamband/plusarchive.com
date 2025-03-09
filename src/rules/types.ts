export type PickField<T, P extends keyof T> = Pick<
  { [K in keyof T]: string },
  P
>;
