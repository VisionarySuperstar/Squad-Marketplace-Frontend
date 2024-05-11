import { create } from "zustand";

type State = {
  state: string;
};

type Action = {
  updateState: (userid: State["state"]) => void;
};

const useCreatGroupState = create<State & Action>((set) => ({
  state: "ready",
  updateState: (value) => set(() => ({ state: value })),
}));

export default useCreatGroupState;
