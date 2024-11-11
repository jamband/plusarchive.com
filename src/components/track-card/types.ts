import type { Track } from "@/types/tracks";

export type Props = {
  track: Track;
  children: React.ReactNode;
};

export type _Props = Props & {
  isVideoAspectRatio: boolean;
  isPlaying: boolean;
};
