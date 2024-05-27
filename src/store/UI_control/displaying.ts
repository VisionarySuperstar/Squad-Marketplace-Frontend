import { create } from "zustand";

type State = {
  displaying: boolean;
  mainText: string;
};

type Action = {
  updateDisplayingState: (displaying: State["displaying"]) => void;
  updateMainText: (mainText: State["mainText"]) => void;
};

const useDisplayingControlStore = create<State & Action>((set) => ({
  displaying: true,
  mainText: "",
  updateDisplayingState: (value) => set(() => ({ displaying: value })),
  updateMainText: (value: string) => set(() => ({ mainText: value })),
}));

export default useDisplayingControlStore;
