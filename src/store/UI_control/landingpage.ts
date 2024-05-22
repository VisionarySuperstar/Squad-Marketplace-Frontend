import { create } from "zustand";

type State = {
  generalModal: boolean;
  welcomeModal: boolean;
};

type Action = {
  updateJoinModal: (generalModal: State["generalModal"]) => void;
  updateWelcomeModal: (welcomeModal: State["welcomeModal"]) => void;
};

const useLandingUIControlStore = create<State & Action>((set) => ({
  generalModal: false,
  welcomeModal: false,
  updateJoinModal: (value) => set(() => ({ generalModal: value })),
  updateWelcomeModal: (value) => set(() => ({ welcomeModal: value })),
}));

export default useLandingUIControlStore;
