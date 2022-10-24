export type MusicProvider = "Bandcamp" | "SoundCloud" | "Vimeo" | "YouTube";

export type MusicProviderAdmin = {
  id: number;
  name: MusicProvider;
};
