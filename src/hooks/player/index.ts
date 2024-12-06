import { DispatchContext, StateContext } from "@/contexts/player";
import type { State } from "@/reducers/player";
import { use, useCallback } from "react";

export const usePlayerState = () => {
  return use(StateContext);
};

export const usePlayerAction = () => {
  const dispatch = use(DispatchContext);

  const setPlayer = useCallback(
    (payload: State) => {
      dispatch({ type: "set", payload });
    },
    [dispatch],
  );

  const resetPlayer = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  return {
    setPlayer,
    resetPlayer,
  } as const;
};
