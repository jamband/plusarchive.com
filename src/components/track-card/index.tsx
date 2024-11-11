import { usePlayerState } from "@/hooks/player";
import { useRouter } from "next/router";
import { Component } from "./component";
import type { Props } from "./types";

export const TrackCard: React.FC<Props> = (props) => {
  const { query } = useRouter();
  const player = usePlayerState();

  const provider = `${query.provider || ""}`;
  const isVideoAspectRatio = ["Vimeo", "YouTube"].includes(provider);
  const isPlaying = player.id === props.track.id;

  return (
    <Component
      {...props}
      isVideoAspectRatio={isVideoAspectRatio}
      isPlaying={isPlaying}
    />
  );
};
