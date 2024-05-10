"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import BidModal from "@/components/marketplace/modals/bidModal";
import WithdrawModal from "@/components/marketplace/modals/withdrawModal";
import Split_line from "@/components/main/split_line";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import NFTs from "@/data/nfts.json";
import { INFT, IGROUP, IUSER } from "@/types";
import useAuth from "@/hooks/useAuth";
import useAPI from "@/hooks/useAPI";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import GROUP_ABI from "@/constants/creator_group.json";
import useToastr from "@/hooks/useToastr";


const Home = ({ params }: { params: { id: string } }) => {
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


  const [nftData, setNftData] = useState<INFT>();
  const [groupName, setGroupName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [isDirector, setIsDirector] = useState<boolean>(false);
  const api = useAPI();

  const getNftData = async () => {
    const result = await api.post("/api/getNftById", { id: params.id });
    setNftData(result.data);
    console.log("auctiontype", result.data.auctiontype);
    console.log("result", result);
    const result1 = await api.post("/api/getGroupId", { id: result.data.groupid });
    setGroupName(result1.data.name);
    setGroupAddress(result1.data.address);
    if (user?.id === result1.data.director) setIsDirector(true);

    const result2 = await api.post("/auth/user/getUserByAddress", { id: result.data.owner });
    setOwnerName(result2.data.name);
  }

  useEffect(() => {
    getNftData();
  }, []);
  const convertSecondsToTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return [days, hours, minutes, seconds];
  }
  const router = useRouter();
  const { showToast } = useToastr();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  const { signIn, isAuthenticated, user } = useAuth();
  const { address, chainId, signer, chain } = useActiveWeb3();
  const [groupAddress, setGroupAddress] = useState<string>("");
  const [contract, setContract] = useState<Contract | undefined>(
    undefined
  );


  useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    const _contract = new Contract(groupAddress, GROUP_ABI, signer);
    setContract(_contract);
  }, [address, chainId, signer, groupAddress]);

  const cancelListing = async () => {
    try {
      if (!nftData) throw "no data";
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);

      const nftId = await contract.getNFTId(nftData.collectionaddress, BigInt(nftData.collectionid));
      console.log("nftId", nftId.toString());
      const tx = await contract.cancelListing(nftId);
      await tx.wait();
      await api.post('/api/updateNft', {
        id: nftData?.id, owner: nftData?.owner, status: 'mint', auctionType: nftData?.auctiontype, initialPrice: nftData?.initialprice,
        salePeriod: nftData?.saleperiod, currentPrice: nftData?.currentprice, currentBidder: nftData?.currentbidder, reducingRate: nftData?.reducingrate, listedNumber: nftData.listednumber
      })
      router.back();
    } catch (err: any) {
      if (String(err.code) === "ACTION_REJECTED") {
        showToast("User rejected transaction.", "warning");
      } else {
        showToast(String(err), "warning");
      }
    } finally {
      setIsLoading(false);
    }


  }

  const endAuction = async () => {
    try {
      if (!nftData) throw "no data";
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading1(true);
      console.log("groupAddress", groupAddress);
      console.log("name", name);
      console.log("here");
      console.log("listNft.collectionaddress ", nftData.collectionaddress);
      console.log("listNft.collectionid ", nftData.collectionid);
      const nftId = await contract.getNFTId(nftData.collectionaddress, BigInt(nftData.collectionid));
      console.log("nftId", nftId.toString());
      const tx = await contract.endEnglishAuction(nftId);
      await tx.wait();
      await api.post('/api/updateNft', {
        id: nftData?.id, owner: nftData?.currentbidder, status: 'sold', auctionType: nftData?.auctiontype, initialPrice: nftData?.initialprice,
        salePeriod: nftData?.saleperiod, currentPrice: nftData?.currentprice, currentBidder: nftData?.currentbidder, reducingRate: nftData?.reducingrate, listedNumber: nftData?.listednumber
      })
      router.back();
    } catch (err: any) {
      if (String(err.code) === "ACTION_REJECTED") {
        showToast("User rejected transaction.", "warning");
      } else {
        showToast(String(err), "warning");
      }
    } finally {
      setIsLoading1(false);
    }
  }

  return (
    <>

      <div className="md:mt-[120px] xs:mt-[100px] font-Maxeville">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 groups md:p-[40px] xl:pt-5 xs:p-[15px]">
          {nftData && (
            <div className="drop-shadow-md lg:me-[40px] sm:me-0">
              <Image
                src={nftData?.avatar}
                className="md:h-[70vh] aspect-square w-full object-cover"
                alt="group_avatar"
                width={706}
                height={706}
              />
              <div className="flex items-center gap-3 p-2">
                <EyeIcon props="#322A44" />
                <div>200</div>
                <div>WATCHING</div>
                <HeartIcon props="#322A44" />
                <div>20</div>
              </div>
            </div>
          )}
          <div className="p-2 flex-col flex justify-between">
            <div className="flex-col">
              <div className="text-[18px] flex gap-4">
                {nftData?.collectionname}
                <div className="flex items-center">
                  <TrendingIcon />
                </div>
              </div>
              <div className="text-[18px] underline">COLLECTION</div>
              <div className="text-gray-400 mt-3">Group</div>
              <div className="text-[18px]">{groupName}</div>
              <div className="text-gray-400 mt-3">Auction Type</div>

              <div className="text-[18px]">
                {Number(nftData?.auctiontype) === 0
                  ? "English Auction"
                  : Number(nftData?.auctiontype) === 1
                    ? "Dutch Auction"
                    : "Offering"}
              </div>
              <div className="text-gray-400 mt-3">Initial Price</div>
              <div className="text-[18px]">{nftData?.initialprice}</div>

              {Number(nftData?.auctiontype) === 1 && (
                <>
                  <div className="text-gray-400 mt-3">Reducing Rate</div>
                  <div className="text-[18px]">{nftData?.reducingrate}</div>
                </>
              )}
              {Number(nftData?.auctiontype) !== 2 && (
                <>
                  <div className="text-gray-400 mt-3">Current Price</div>
                  <div className="text-[18px]">{nftData?.currentprice}</div>
                </>
              )}
              {Number(nftData?.auctiontype) !== 2 && (
                <>
                  <div className="text-gray-400 mt-3">Sale Period</div>
                  <div className="text-[18px] flex gap-2">
                    {(() => {
                      const period = convertSecondsToTime(Number(nftData?.saleperiod));

                      return period.map((item, index) => (
                        <div key={index}>
                          {index ? ": " : ""} {item >= 10 ? item : "0" + item}
                        </div>
                      ));
                    })()}
                  </div>
                </>
              )}
              {Number(nftData?.auctiontype) === 0 && (
                <>
                  <div className="text-gray-400 mt-3">Highest Bidder</div>
                  <div className="text-[18px]">{nftData?.currentbidder}</div>
                </>
              )}
            </div>
            {
              isDirector &&

              <div className="flex  mt-3 mb-[35px]">
                <button className="w-full bg-[#322A44] rounded-full text-white h-[30px] flex justify-center items-center text-center" onClick={cancelListing}>
                  {isLoading ?
                    <>
                      <Icon icon="eos-icons:bubble-loading" width={20} height={20} /> PROCESSING...
                    </> :
                    "CANCEL LISTING"
                  }
                </button>
                {
                  Number(nftData?.auctiontype) === 0 && (
                    <button className="w-full bg-[#322A44] rounded-full text-white h-[30px] flex justify-center items-center text-center" onClick={endAuction}>
                      {isLoading1 ?
                        <>
                          <Icon icon="eos-icons:bubble-loading" width={20} height={20} /> PROCESSING...
                        </> :
                        "END AUCTION"
                      }
                    </button>
                  )
                }
              </div>
            }
            <Split_line />
            {/* <div>DESCRIPTION</div> */}
            <div className="">
              <Collapse title="Description">
                <p>This is the content of the first collapsible section.</p>
              </Collapse>
              <Collapse title="History">
                <p>This is the content of the second collapsible section.</p>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-[-400px] bg-cover bg-no-repeat h-[720px] w-full -z-10"
        style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
      ></div>
    </>
  );
};

export default Home;
