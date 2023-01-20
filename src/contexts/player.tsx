import type { Dispatch, State } from "@/reducers/player";
import { initialState, reducer } from "@/reducers/player";
import { createContext, useReducer } from "react";

export const StateContext = createContext<State>({} as State);
export const DispatchContext = createContext<Dispatch>({} as Dispatch);

type Props = {
  children: React.ReactNode;
};

export const PlayerProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
