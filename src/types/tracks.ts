import type { MusicProvider } from "./music-providers";
import type { Pagination } from "./pagination";

type Base = {
  id: string;
  url: string;
  provider: MusicProvider;
  provider_key: string;
  title: string;
  image: string;
  urge: boolean;
  genres: Array<string>;
  created_at: string;
  updated_at: string;
};

export type Track = Pick<
  Base,
  | "id"
  | "url"
  | "provider"
  | "provider_key"
  | "title"
  | "image"
  | "genres"
  | "created_at"
>;

export type TrackCollection = {
  data: Array<Track>;
  pagination: Pagination;
};

export type TrackAdmin = Pick<
  Base,
  | "id"
  | "url"
  | "provider"
  | "title"
  | "image"
  | "urge"
  | "genres"
  | "created_at"
  | "updated_at"
>;

export type TrackAdminCollection = {
  data: Array<TrackAdmin>;
  pagination: Pagination;
};
