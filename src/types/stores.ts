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

export type Store = Pick<Base, "name" | "country" | "url" | "links" | "tags">;

export type StoreCollection = {
  data: Array<Store>;
  pagination: Pagination;
};

export type StoreAdmin = Pick<
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

export type StoreAdminCollection = {
  data: Array<StoreAdmin>;
  pagination: Pagination;
};
