import { create } from "zustand";

type State = {
  url: string;
  isshow: boolean;
  isbackbtn: boolean;
  isbackground: boolean;
  isgroupbtn: boolean;
};

type Action = {
  updateUrl: (url: State["url"]) => void;
  updateIsShow: (isshow: State["isshow"]) => void;
  updateIsBackbtn: (isbackbtn: State["isbackbtn"]) => void;
  updateIsBackground: (isbackground: State["isbackground"]) => void;
  updateIsGroupBtn: (isbackground: State["isbackground"]) => void;
};

const useNavbarUIControlStore = create<State & Action>((set) => ({
  url: "",
  isshow: true,
  isbackbtn: false,
  isbackground: false,
  isgroupbtn: false,
  updateUrl: (value) => set(() => ({ url: value })),
  updateIsShow: (value) => set(() => ({ isshow: value })),
  updateIsBackbtn: (value) => set(() => ({ isbackbtn: value })),
  updateIsBackground: (value) => set(() => ({ isbackground: value })),
  updateIsGroupBtn: (value) => {
    set(() => ({ isgroupbtn: value }));
  },
}));

export default useNavbarUIControlStore;
