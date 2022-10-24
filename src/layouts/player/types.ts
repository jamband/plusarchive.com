import type { usePlayerLoading } from "~/hooks/player-loading";
import type { Player } from "~/types/player";

export type _Props = {
  isVisible: boolean;
  isAspectSquare: boolean;
  player: Player;
  embedSrc: string;
  loading: ReturnType<typeof usePlayerLoading>;
};
