export type MusicProvider = "Bandcamp" | "SoundCloud" | "Vimeo" | "YouTube";

type Base = {
  id: number;
  name: MusicProvider;
};

export type MusicProviderAdmin = Pick<Base, "id" | "name">;
