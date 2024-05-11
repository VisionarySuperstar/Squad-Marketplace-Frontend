import { create } from "zustand";

type State = {
  userid: string;
  username: string;
  isLogin: boolean;
};

type Action = {
  updateUserId: (userid: State["userid"]) => void;
  updateUserName: (username: State["username"]) => void;
  updateIsLogin: (isLogin: State["isLogin"]) => void;
};

const useUserStore = create<State & Action>((set) => ({
  userid: "190635",
  username: "Abhilash Bharadwaj",
  isLogin: false,
  updateUserId: (value) => set(() => ({ userid: value })),
  updateUserName: (value) => set(() => ({ username: value })),
  updateIsLogin: (value) => set(() => ({ isLogin: value })),
}));

export default useUserStore;
