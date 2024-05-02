import { create } from "zustand";

type State = {
  notificationModal: boolean;
  
};

type Action = {
  updateNotificationModal: (notificationModal: State["notificationModal"]) => void;
};

const useNotificationUIControlStore = create<State & Action>((set) => ({
  notificationModal: false,
  updateNotificationModal: (value) => set(() => ({ notificationModal: value }))
}));

export default useNotificationUIControlStore;
