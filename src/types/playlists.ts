import type { MusicProvider } from "./music-providers";
import type { Pagination } from "./pagination";

export type Playlist = {
  id: string;
  url: string;
  provider: MusicProvider;
  provider_key: string;
  title: string;
};

export type PlaylistAdmin = {
  id: string;
  url: string;
  provider: MusicProvider;
  title: string;
  created_at: string;
  updated_at: string;
};

export type PlaylistAdminCollection = {
  data: Array<PlaylistAdmin>;
  pagination: Pagination;
};
