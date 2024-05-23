import { create } from "zustand";

type State = {
  welcomeModal: boolean;
};

type Action = {
  updateWelcomeModal: (welcomeModal: State["welcomeModal"]) => void;
};

const useLandingUIControlStore = create<State & Action>((set) => ({
  generalModal: false,
  welcomeModal: false,
  updateWelcomeModal: (value) => set(() => ({ welcomeModal: value })),
}));

export default useLandingUIControlStore;
