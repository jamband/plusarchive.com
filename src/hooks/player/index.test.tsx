import { act, renderHook } from "@testing-library/react";
import { PlayerProvider } from "~/contexts/player";
import type { State } from "~/reducers/player";
import { initialState } from "~/reducers/player";
import { usePlayerAction, usePlayerState } from ".";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PlayerProvider>{children}</PlayerProvider>
);

const player: State = {
  id: "id1",
  title: "title1",
  provider: "SoundCloud",
  provider_key: "key1",
  type: "track",
};

test("initial state", () => {
  const { result } = renderHook(usePlayerState, { wrapper });
  expect(result.current).toStrictEqual<State>(initialState);
});

test("setPlayer", () => {
  const { result } = renderHook(
    () => {
      const state = usePlayerState();
      const { setPlayer } = usePlayerAction();

      return {
        state,
        setPlayer,
      };
    },
    { wrapper }
  );

  expect(result.current.state).toStrictEqual<State>(initialState);

  act(() => result.current.setPlayer(player));
  expect(result.current.state).toStrictEqual<State>(player);
});

test("resetPlayer", () => {
  const { result } = renderHook(
    () => {
      const state = usePlayerState();
      const { setPlayer, resetPlayer } = usePlayerAction();

      return {
        state,
        setPlayer,
        resetPlayer,
      };
    },
    { wrapper }
  );

  act(() => result.current.setPlayer(player));
  expect(result.current.state).toStrictEqual<State>(player);

  act(result.current.resetPlayer);
  expect(result.current.state).toStrictEqual<State>(initialState);
});
