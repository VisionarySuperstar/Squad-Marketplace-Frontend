import { create } from "zustand";

type State = {
  bidModal: boolean;
  withdrawModal:boolean;
};

type Action = {
  updateBidModal: (bidModal: State["bidModal"]) => void;
  updateWithdrawModal: (withdrawModal: State["withdrawModal"]) => void;

};

const useMarketplaceUIControlStore = create<State & Action>((set) => ({
  bidModal: false,
  withdrawModal:false,
  updateBidModal: (value) => set(() => ({ bidModal: value })),
  updateWithdrawModal: (value) => set(() => ({ withdrawModal: value })),

}));

export default useMarketplaceUIControlStore;
