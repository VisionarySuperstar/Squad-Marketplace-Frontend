import { create } from "zustand";

type State = {
  loading: boolean;
};

type Action = {
  updateLoadingState: (loading: State["loading"]) => void;
};

const useLoadingControlStore = create<State & Action>((set) => ({
  loading: true,
  updateLoadingState: (value) => set(() => ({ loading: value })),
}));

export default useLoadingControlStore;
