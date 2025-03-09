import type { Pagination } from "./pagination";

type Base = {
  id: number;
  name: string;
};

export type LabelTagAdmin = Pick<Base, "id" | "name">;

export type LabelTagCollection = {
  data: Array<LabelTagAdmin>;
  pagination: Pagination;
};
