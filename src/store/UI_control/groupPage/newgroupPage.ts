import { create } from "zustand";

type State = {
  createGroupModal: boolean;
  addMemberModal: boolean;
  mintModal: boolean;
  listModal: boolean;
};

type Action = {
  updateCreateGroupModal: (createGroupModal: State["createGroupModal"]) => void;
  updateAddMemberModal: (createGroupModal: State["addMemberModal"]) => void;
  updateMintModal: (mintModal: State["mintModal"]) => void;
  updateListModal: (listModal: State["listModal"]) => void;

};

const useGroupUIControlStore = create<State & Action>((set) => ({
  createGroupModal: false,
  addMemberModal: false,
  mintModal: false,
  listModal: false,
  updateCreateGroupModal: (value) => set(() => ({ createGroupModal: value })),
  updateAddMemberModal: (value) => set(() => ({ addMemberModal: value })),
  updateMintModal: (value) => set(() => ({ mintModal: value })),
  updateListModal: (value) => set(() => ({ listModal: value }))
}));

export default useGroupUIControlStore;
