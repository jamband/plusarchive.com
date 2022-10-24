import { usePlayerState } from "~/hooks/player";

export const playerState = usePlayerState as jest.Mock;

beforeEach(() => {
  playerState.mockReset();
});
