import type { Pagination } from "./pagination";

export type BookmarkTagAdmin = {
  id: number;
  name: string;
};

export type BookmarkTagCollection = {
  data: Array<BookmarkTagAdmin>;
  pagination: Pagination;
};
