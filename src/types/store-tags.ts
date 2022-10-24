import type { Pagination } from "./pagination";

export type StoreTagAdmin = {
  id: number;
  name: string;
};

export type StoreTagCollection = {
  data: Array<StoreTagAdmin>;
  pagination: Pagination;
};
