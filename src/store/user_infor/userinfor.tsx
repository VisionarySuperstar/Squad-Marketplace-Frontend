import { create } from "zustand";

type State = {
  username: string;
};

type Action = {
  updateUserName: (username: State["username"]) => void;
};

const useUserStore = create<State & Action>((set) => ({
  username: "",
  updateUserName: (value) => set(() => ({ username: value })),
}));

export default useUserStore;