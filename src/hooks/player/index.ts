import { useCallback, useContext } from "react";
import { DispatchContext, StateContext } from "~/contexts/player";
import type { State } from "~/reducers/player";

export const usePlayerState = () => {
  return useContext(StateContext);
};

export const usePlayerAction = () => {
  const dispatch = useContext(DispatchContext);

  const setPlayer = useCallback(
    (payload: State) => {
      dispatch({ type: "set", payload });
    },
    [dispatch]
  );

  const resetPlayer = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  return {
    setPlayer,
    resetPlayer,
  } as const;
};
