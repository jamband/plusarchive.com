import type { Pagination } from "./pagination";

type Base = {
  id: number;
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
  created_at: string;
  updated_at: string;
};

export type Bookmark = Pick<
  Base,
  "name" | "country" | "url" | "links" | "tags"
>;

export type BookmarkCollection = {
  data: Array<Bookmark>;
  pagination: Pagination;
};

export type BookmarkAdmin = Pick<
  Base,
  | "id"
  | "name"
  | "country"
  | "url"
  | "links"
  | "tags"
  | "created_at"
  | "updated_at"
>;

export type BookmarkAdminCollection = {
  data: Array<BookmarkAdmin>;
  pagination: Pagination;
};
