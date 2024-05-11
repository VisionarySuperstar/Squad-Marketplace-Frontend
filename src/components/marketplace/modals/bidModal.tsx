"use client";

import { useState, useEffect } from "react";
import MyGroups from "@/data/mygroups.json";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import { INFT } from "@/types";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import Marketplace_ABI from "@/constants/marketplace.json";
import { Marketplace_ADDRESSES } from "@/constants/config";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useToastr from "@/hooks/useToastr";
import GROUP_ABI from "@/constants/creator_group.json";
import USDC_ABI from "@/constants/usdc.json";
import { USDC_ADDRESS } from "@/constants/config";
import useAPI from "@/hooks/useAPI";
import { Icon } from "@iconify/react/dist/iconify.js";

interface BidGroupModalInterface {
  nftData: INFT;
  groupAddress: string;
  groupId: string;
  getData: () => void;
}

const BidGroupModal = ({
  nftData,
  groupAddress,
  groupId,
  getData,
}: BidGroupModalInterface) => {
  const setBidModalState = useMarketplaceUIControlStore(
    (state) => state.updateBidModal
  );
  const setWithdrawModalState = useMarketplaceUIControlStore(
    (state) => state.updateWithdrawModal
  );
  const bidModalState = useMarketplaceUIControlStore((state) => state.bidModal);
  const withdrawModalState = useMarketplaceUIControlStore(
    (state) => state.withdrawModal
  );
  const seletedGroup = MyGroups[3];
  const [bidAmount, setBidAmount] = useState<string>("");
  const { showToast } = useToastr();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn, isAuthenticated, user } = useAuth();
  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [usdc_contract, setUsdc_Contract] = useState<Contract | undefined>(
    undefined
  );
  useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    const _contract = new Contract(
      Marketplace_ADDRESSES[chainId],
      Marketplace_ABI,
      signer
    );
    setContract(_contract);
    const _usdc_contract = new Contract(
      USDC_ADDRESS[chainId],
      USDC_ABI,
      signer
    );
    setUsdc_Contract(_usdc_contract);
  }, [address, chainId, signer]);

  const api = useAPI();

  const handleBidClick = async () => {
    try {
      if (!contract) throw "no contract";
      if (!usdc_contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      if (Number(nftData.auctiontype) === 0) {
        if (Number(bidAmount) <= Number(nftData.currentprice))
          throw "You must bid higher than now";
        const tx1 = await usdc_contract.approve(
          Marketplace_ADDRESSES[chainId],
          BigInt(Number(bidAmount) * 1e18)
        );
        await tx1.wait();
        const tx = await contract.makeBidToEnglishAuction(
          BigInt(nftData.listednumber),
          BigInt(Number(bidAmount) * 1e18)
        );
        await tx.wait();
        const auction_data = await contract.englishAuctions(
          BigInt(nftData.listednumber)
        );
        console.log("auction_data", auction_data);
        const current_winner = auction_data.currentWinner;
        const current_price = auction_data.currentPrice;
        const currentPrice = Number(Number(current_price) / 1e18).toString();

        await api.post("/api/updateNft", {
          id: nftData.id,
          owner: nftData.owner,
          status: "list",
          auctionType: nftData.auctiontype,
          initialPrice: nftData.initialprice,
          salePeriod: nftData.saleperiod,
          currentPrice: currentPrice,
          currentBidder: user.name,
          reducingRate: nftData.reducingrate ? nftData.reducingrate : 0,
          listedNumber: nftData.listednumber,
        });
      } else if (Number(nftData.auctiontype) === 2) {
        const tx1 = await usdc_contract.approve(
          Marketplace_ADDRESSES[chainId],
          BigInt(Number(bidAmount) * 1e18)
        );
        await tx1.wait();
        const tx = await contract.makeBidToOfferingSale(
          BigInt(nftData.listednumber),
          BigInt(Number(bidAmount) * 1e18)
        );
        await tx.wait();
        // const list_number = await contract.offeringSale_listedNumber(BigInt(nftData.listednumber)) ;
        const _group_contract = new Contract(groupAddress, GROUP_ABI, signer);
        const offering_number =
          await _group_contract.getNumberOfSaleOfferingTransaction();
        await api.post("/api/addOffering", {
          groupId: groupId,
          buyer: user.name,
          nftId: nftData.id,
          confirm_member: JSON.stringify([]),
          price: bidAmount,
          transactionId: Number(Number(offering_number) - 1).toString(),
        });
      }

      getData();
    } catch (err: any) {
      if (String(err.code) === "ACTION_REJECTED") {
        showToast("User rejected transaction.", "warning");
      } else {
        showToast(String(err), "warning");
      }
    } finally {
      setIsLoading(false);
    }

    setBidModalState(false);
  };
  return (
    <div className=" font-Maxeville">
      <div
        className="bg-chocolate-main/50 w-[100vw] h-[100vh] fixed top-0 z-[1000]"
        onClick={() => {
          setBidModalState(false);
        }}
      ></div>
      <div className="joinModal drop-shadow-lg">
        <div
          className="closeBtn"
          onClick={() => {
            setBidModalState(false);
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
          <div className="flex items-center gap-3 mt-5 mb-5">
            <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px]  w-1/2">
              <input
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                type="text"
                placeholder="3000"
              />
            </div>
            <div className="flex items-center justify-center text-[20px]">
              USDC
            </div>
          </div>
          <div className="flex justify-center items-center mt-5 mb-5">
            <button
              className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex items-center justify-center"
              onClick={handleBidClick}
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
                "PLACE BID"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidGroupModal;
