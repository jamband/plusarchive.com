import type { Pagination } from "./pagination";

export type Store = {
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
};

export type StoreCollection = {
  data: Array<Store>;
  pagination: Pagination;
};

export type StoreAdmin = {
  id: number;
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
  created_at: string;
  updated_at: string;
};

export type StoreAdminCollection = {
  data: Array<StoreAdmin>;
  pagination: Pagination;
};
