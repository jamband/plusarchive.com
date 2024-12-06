import type { Dispatch, State } from "@/reducers/notification";
import { initialState, reducer } from "@/reducers/notification";
import { createContext, useReducer } from "react";

export const StateContext = createContext<State>({} as State);
export const DispatchContext = createContext<Dispatch>({} as Dispatch);

type Props = {
  children: React.ReactNode;
};

export const NotificationProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext value={state}>
      <DispatchContext value={dispatch}>{props.children}</DispatchContext>
    </StateContext>
  );
};
