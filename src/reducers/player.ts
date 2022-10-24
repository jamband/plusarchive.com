import type { MusicProvider } from "~/types/music-providers";

export type State = {
  id: string;
  title: string;
  type: "track" | "playlist";
  provider: MusicProvider;
  provider_key: string;
};

type SetAction = {
  type: "set";
  payload: State;
};

type ResetAction = {
  type: "reset";
};

export const initialState: State = {
  id: "",
  title: "",
  type: "track",
  provider: "Bandcamp",
  provider_key: "",
};

export type Action = SetAction | ResetAction;

export type Dispatch = (action: Action) => void;

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
