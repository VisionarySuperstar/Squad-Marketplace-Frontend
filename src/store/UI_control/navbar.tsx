import { create } from "zustand";

type State = {
  url: string;
  isbackbtn: boolean;
};

type Action = {
  updateUrl: (url: State["url"]) => void;
  updateBackbtn: (isbackbtn: State["isbackbtn"]) => void;
};

const useNavbarUIControlStore = create<State & Action>((set) => ({
  url: "",
  isbackbtn: false,
  updateUrl: (value) => set(() => ({ url: value })),
  updateBackbtn: (value) => set(() => ({ isbackbtn: value })),
}));

export default useNavbarUIControlStore;
