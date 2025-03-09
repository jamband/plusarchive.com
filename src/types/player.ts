import type { Playlist } from "./playlists";
import type { Track } from "./tracks";

type Base = {
  [K in Extract<keyof Track, keyof Playlist>]: Track[K] | Playlist[K];
};

export type Player = Pick<
  Base,
  "id" | "title" | "provider" | "provider_key"
> & {
  type: "track" | "playlist";
};
