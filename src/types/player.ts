import type { MusicProvider } from "./music-providers";

export type Player = {
  id: string;
  title: string;
  type: "track" | "playlist";
  provider: MusicProvider;
  provider_key: string;
};
