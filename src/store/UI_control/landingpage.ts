import { create } from "zustand";

type State = {
  joinModal: boolean;
  welcomeModal: boolean;
};

type Action = {
  updateJoinModal: (joinModal: State["joinModal"]) => void;
  updateWelcomeModal: (welcomeModal: State["welcomeModal"]) => void;
};

const useUIControlStore = create<State & Action>((set) => ({
  joinModal: false,
  welcomeModal: false,
  updateJoinModal: (value) => set(() => ({ joinModal: value })),
  updateWelcomeModal: (value) => set(() => ({ welcomeModal: value })),
}));

export default useUIControlStore;
