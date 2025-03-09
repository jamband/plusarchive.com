import type { Pagination } from "./pagination";

type Base = {
  id: number;
  name: string;
};

export type TrackGenreAdmin = Pick<Base, "id" | "name">;

export type TrackGenreCollection = {
  data: Array<TrackGenreAdmin>;
  pagination: Pagination;
};
