import type { Pagination } from "./pagination";

export type TrackGenreAdmin = {
  id: number;
  name: string;
};

export type TrackGenreCollection = {
  data: Array<TrackGenreAdmin>;
  pagination: Pagination;
};
