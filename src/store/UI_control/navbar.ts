import { create } from "zustand";

type State = {
  url: string;
  isshow: boolean;
  isbackbtn: boolean;
  isbackground: boolean;
};

type Action = {
  updateUrl: (url: State["url"]) => void;
  updateIsShow: (isshow: State["isshow"]) => void;
  updateIsBackbtn: (isbackbtn: State["isbackbtn"]) => void;
};

const useNavbarUIControlStore = create<State & Action>((set) => ({
  url: "",
  isshow: false,
  isbackbtn: false,
  isbackground: false,
  isLogin: false,
  updateUrl: (value) => set(() => ({ url: value })),
  updateIsShow: (value) => set(() => ({ isshow: value })),
  updateIsBackbtn: (value) => set(() => ({ isbackbtn: value })),
}));

export default useNavbarUIControlStore;
