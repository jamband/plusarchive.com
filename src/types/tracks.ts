import type { MusicProvider } from "./music-providers";
import type { Pagination } from "./pagination";

export type Track = {
  id: string;
  url: string;
  provider: MusicProvider;
  provider_key: string;
  title: string;
  image: string;
  genres: Array<string>;
  created_at: string;
};

export type TrackCollection = {
  data: Array<Track>;
  pagination: Pagination;
};

export type TrackAdmin = {
  id: string;
  url: string;
  provider: MusicProvider;
  title: string;
  image: string;
  urge: boolean;
  genres: Array<string>;
  created_at: string;
  updated_at: string;
};

export type TrackAdminCollection = {
  data: Array<TrackAdmin>;
  pagination: Pagination;
};
