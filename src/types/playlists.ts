import type { MusicProvider } from "./music-providers";
import type { Pagination } from "./pagination";

type Base = {
  id: string;
  url: string;
  provider: MusicProvider;
  provider_key: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type Playlist = Pick<
  Base,
  "id" | "url" | "provider" | "provider_key" | "title"
>;

export type PlaylistAdmin = Pick<
  Base,
  "id" | "url" | "provider" | "title" | "created_at" | "updated_at"
>;

export type PlaylistAdminCollection = {
  data: Array<PlaylistAdmin>;
  pagination: Pagination;
};
