import { usePlayerState } from "@/hooks/player";
import { useRouter } from "next/router";
import { Component } from "./component";
import type { Props } from "./types";

export const TrackCard: React.FC<Props> = (props) => {
  const { query } = useRouter();
  const player = usePlayerState();

  const provider = `${query.provider || ""}`;

  const aspectRatio = ["Vimeo", "YouTube"].includes(provider)
    ? "aspect-square md:aspect-video"
    : "aspect-square";

  const isPlaying = player.id === props.track.id;

  return (
    <Component {...props} aspectRatio={aspectRatio} isPlaying={isPlaying} />
  );
};
