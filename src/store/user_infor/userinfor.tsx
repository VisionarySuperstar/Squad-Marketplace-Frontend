import { create } from "zustand";

type State = {
  userid: string;
  username: string;
};

type Action = {
  updateUserId: (userid: State["userid"]) => void;
  updateUserName: (username: State["username"]) => void;
};

const useUserStore = create<State & Action>((set) => ({
  userid: "190635",
  username: "Abhilash Bharadwaj",
  updateUserId: (value) => set(() => ({ userid: value })),
  updateUserName: (value) => set(() => ({ username: value })),
}));

export default useUserStore;
