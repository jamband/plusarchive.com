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

export type Label = Pick<Base, "name" | "country" | "url" | "links" | "tags">;

export type LabelCollection = {
  data: Array<Label>;
  pagination: Pagination;
};

export type LabelAdmin = Pick<
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

export type LabelAdminCollection = {
  data: Array<LabelAdmin>;
  pagination: Pagination;
};
