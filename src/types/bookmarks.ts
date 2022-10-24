import type { Pagination } from "./pagination";

export type Bookmark = {
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
};

export type BookmarkCollection = {
  data: Array<Bookmark>;
  pagination: Pagination;
};

export type BookmarkAdmin = {
  id: number;
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
  created_at: string;
  updated_at: string;
};

export type BookmarkAdminCollection = {
  data: Array<BookmarkAdmin>;
  pagination: Pagination;
};
