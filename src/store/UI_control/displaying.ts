import { create } from "zustand";

type State = {
  displaying: boolean;
};

type Action = {
  updateDisplayingState: (displaying: State["displaying"]) => void;
};

const useDisplayingControlStore = create<State & Action>((set) => ({
  displaying: true,
  updateDisplayingState: (value) => set(() => ({ displaying: value })),
}));

export default useDisplayingControlStore;
