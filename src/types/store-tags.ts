import type { Pagination } from "./pagination";

type Base = {
  id: number;
  name: string;
};

export type StoreTagAdmin = Pick<Base, "id" | "name">;

export type StoreTagCollection = {
  data: Array<StoreTagAdmin>;
  pagination: Pagination;
};
