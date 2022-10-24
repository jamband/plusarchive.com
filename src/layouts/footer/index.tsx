import { useRouter } from "next/router";
import { usePlayerAction, usePlayerState } from "~/hooks/player";
import { Component } from "./component";

export const Footer: React.FC = () => {
  const player = usePlayerState();
  const { resetPlayer } = usePlayerAction();
  const { pathname } = useRouter();

  const isPlayerVisible = ["/tracks/[id]", "/playlists/[id]"].includes(
    pathname
  );

  return (
    <Component
      isPlayerVisible={isPlayerVisible}
      player={player}
      resetPlayer={resetPlayer}
    />
  );
};
