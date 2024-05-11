import { create } from "zustand";

type State = {
  createGroupModal: boolean;
  addMemberModal: boolean;
  mintModal: boolean;
  listModal: boolean;
  profileModal: boolean;
};

type Action = {
  updateCreateGroupModal: (createGroupModal: State["createGroupModal"]) => void;
  updateAddMemberModal: (createGroupModal: State["addMemberModal"]) => void;
  updateMintModal: (mintModal: State["mintModal"]) => void;
  updateListModal: (listModal: State["listModal"]) => void;
  updateProfileModal: (profileModal: State["profileModal"]) => void;
};

const useGroupUIControlStore = create<State & Action>((set) => ({
  createGroupModal: false,
  addMemberModal: false,
  mintModal: false,
  listModal: false,
  profileModal:false,
  updateCreateGroupModal: (value) => set(() => ({ createGroupModal: value })),
  updateAddMemberModal: (value) => set(() => ({ addMemberModal: value })),
  updateMintModal: (value) => set(() => ({ mintModal: value })),
  updateListModal: (value) => set(() => ({ listModal: value })),
  updateProfileModal: (value) => set(() => ({profileModal: value}))
}));

export default useGroupUIControlStore;
