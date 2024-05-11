import { create } from "zustand";

type State = {
  newMessage: string;
  notificationModal: boolean;
};

type Action = {
  updateNewMessage: (notificationModal: State["newMessage"]) => void;
  updateNotificationModal: (
    notificationModal: State["notificationModal"]
  ) => void;
};

const useNotificationUIControlStore = create<State & Action>((set) => ({
  newMessage: "",
  notificationModal: false,
  updateNewMessage: (value) => set(() => ({ newMessage: value })),
  updateNotificationModal: (value) => set(() => ({ notificationModal: value })),
}));

export default useNotificationUIControlStore;
