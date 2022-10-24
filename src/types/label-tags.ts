import type { Pagination } from "./pagination";

export type LabelTagAdmin = {
  id: number;
  name: string;
};

export type LabelTagCollection = {
  data: Array<LabelTagAdmin>;
  pagination: Pagination;
};
