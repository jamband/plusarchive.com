export type State = string;

type SetAction = {
  type: "set";
  payload: State;
};

type ResetAction = {
  type: "reset";
};

export type Action = SetAction | ResetAction;

export type Dispatch = (action: Action) => void;

export const initialState: State = "";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "reset":
      return initialState;
    default:
      return state;
  }
};
