import type { Pagination } from "./pagination";

export type Label = {
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
};

export type LabelCollection = {
  data: Array<Label>;
  pagination: Pagination;
};

export type LabelAdmin = {
  id: number;
  name: string;
  country: string;
  url: string;
  links: string;
  tags: Array<string>;
  created_at: string;
  updated_at: string;
};

export type LabelAdminCollection = {
  data: Array<LabelAdmin>;
  pagination: Pagination;
};
