import type { Pagination } from "./pagination";

type Base = {
  id: number;
  name: string;
};

export type BookmarkTagAdmin = Pick<Base, "id" | "name">;

export type BookmarkTagCollection = {
  data: Array<BookmarkTagAdmin>;
  pagination: Pagination;
};
