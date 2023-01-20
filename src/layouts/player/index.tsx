import { APP_PRIMARY_COLOR } from "@/constants/app";
import { usePlayerState } from "@/hooks/player";
import { usePlayerLoading } from "@/hooks/player-loading";
import { useRouter } from "next/router";
import { Component } from "./component";

export const Player: React.FC = () => {
  const player = usePlayerState();
  const { pathname } = useRouter();
  const loading = usePlayerLoading();

  if (player.id === "") {
    return null;
  }

  const isVisible = ["/tracks/[id]", "/playlists/[id]"].includes(pathname);
  const isAspectSquare = ["Bandcamp", "SoundCloud"].includes(player.provider);

  let embedSrc = "";

  if (player.provider === "Bandcamp" && player.type === "track") {
    embedSrc = `https://bandcamp.com/EmbeddedPlayer/track=${player.provider_key}/size=large/tracklist=false/bgcol=333333/linkcol=${APP_PRIMARY_COLOR}`;
  }

  if (player.provider === "Bandcamp" && player.type === "playlist") {
    embedSrc = `https://bandcamp.com/EmbeddedPlayer/album=${player.provider_key}/size=large/tracklist=false/bgcol=333333/linkcol=${APP_PRIMARY_COLOR}`;
  }

  if (player.provider === "SoundCloud" && player.type === "track") {
    embedSrc = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${player.provider_key}&show_comments=false&color=${APP_PRIMARY_COLOR}&hide_related=true&visual=true`;
  }

  if (player.provider === "SoundCloud" && player.type === "playlist") {
    embedSrc = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${player.provider_key}&show_comments=false&color=${APP_PRIMARY_COLOR}&hide_related=true&show_playcount=false`;
  }

  if (player.provider === "Vimeo") {
    embedSrc = `https://player.vimeo.com/video/${player.provider_key}`;
  }

  if (player.provider === "YouTube" && player.type === "track") {
    embedSrc = `https://www.youtube.com/embed/${player.provider_key}?playsinline=1&rel=0`;
  }

  if (player.provider === "YouTube" && player.type === "playlist") {
    embedSrc = `https://www.youtube.com/embed/videoseries?list=${player.provider_key}&playsinline=1&rel=0`;
  }

  return (
    <Component
      isVisible={isVisible}
      isAspectSquare={isAspectSquare}
      player={player}
      embedSrc={embedSrc}
      loading={loading}
    />
  );
};
