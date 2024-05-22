"use client";

import react, { useState, useEffect } from "react";
import Image from "next/image";
import MyGroups from "@/data/mygroups.json";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import GROUP_ABI from "@/constants/creator_group.json";
import { Marketplace_ADDRESSES } from "@/constants/config";
import MARKETPLACE_ABI from "@/constants/marketplace.json";

import useAuth from "@/hooks/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { INFT } from "@/types";
import useDisplayingControlStore from "@/store/UI_control/displaying";

interface WithdrawGroupModalInterface {
  nftData: INFT;
}

const WithdrawGroupModal = ({ nftData }: WithdrawGroupModalInterface) => {
  const setIsDisplaying = useDisplayingControlStore(
    (state) => state.updateDisplayingState
  );
  const setBidModalState = useMarketplaceUIControlStore(
    (state) => state.updateBidModal
  );
  const setWithdrawModalState = useMarketplaceUIControlStore(
    (state) => state.updateWithdrawModal
  );
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const api = useAPI();

  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!address || !chainId || !signer || !nftData) {
      return;
    }
    const _market_contract = new Contract(
      Marketplace_ADDRESSES[chainId],
      MARKETPLACE_ABI,
      signer
    );
    setContract(_market_contract);
  }, [address, chainId, signer, nftData]);
  useEffect(() => {
    getWithdrawAmounts();
  }, [contract]);
  const getWithdrawAmounts = async () => {
    if (!contract) return;
    if (Number(nftData.auctiontype) === 0) {
      const value = await contract.withdrawBalanceForEnglishAuction(
        BigInt(nftData.listednumber),
        user?.wallet
      );
      console.log("value ", value);
      setWithdrawAmount((Number(value) / 1e18).toString());
    } else if (Number(nftData.auctiontype) === 2) {
      const value = await contract.withdrawBalanceForOfferingSale(
        BigInt(nftData.listednumber),
        user?.wallet
      );
      console.log("value ", value);
      setWithdrawAmount((Number(value) / 1e18).toString());
    }
  };
  const handleWithdrawClick = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      if (!Number(withdrawAmount)) {
        toast.error("You don't have any balance to withdraw!");
        return;
      }
      setIsLoading(true);
      setIsDisplaying(true);
      if (Number(nftData.auctiontype) === 0) {
        const tx = await contract.withdrawFromEnglishAuction(
          BigInt(nftData.listednumber)
        );
        await tx.wait();
      } else if (Number(nftData.auctiontype) === 2) {
        const tx = await contract.withdrawFromOfferingSale(
          BigInt(nftData.listednumber)
        );
        await tx.wait();
      }
      await api.post("/api/removeBidState", {
        bidder: user.id,
        nft: nftData.id
      })
      setWithdrawModalState(false);
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
      setIsDisplaying(false);
    }
  };
  return (
    <div className="">
      <div
        className="bg-chocolate-main/50 w-[100vw] h-[100vh] fixed top-0 z-[1000]"
        onClick={() => {
          setWithdrawModalState(false);
        }}
      ></div>
      <div className="generalModal px-5 z-[1300] drop-shadow-lg">
        <div
          className="closeBtn"
          onClick={() => {
            setWithdrawModalState(false);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z"
              fill="#322A44"
            />
          </svg>
        </div>

        <div className="p-5  rounded-lg flex-col justify-between">
          <div className="flex items-center gap-3 mt-5 mb-5 text-lg">
            Are you sure you want to withdraw your bid of{" "}
            {withdrawAmount ? withdrawAmount : "0"} USDC from this auction?
          </div>
          <div className="flex justify-center items-center mt-5 mb-5">
            <button
              className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex justify-center items-center"
              onClick={handleWithdrawClick}
            >
              {isLoading ? (
                <>
                  <Icon
                    icon="eos-icons:bubble-loading"
                    width={20}
                    height={20}
                  />{" "}
                  PROCESSING...
                </>
              ) : (
                "WITHDRAW BID"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawGroupModal;
