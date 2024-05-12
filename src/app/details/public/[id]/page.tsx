/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import BidModal from "@/components/marketplace/modals/bidModal";
import WithdrawModal from "@/components/marketplace/modals/withdrawModal";
import Split_line from "@/components/main/split_line";

import useAPI from "@/hooks/useAPI";
import { INFT } from "@/types";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import Marketplace_ABI from "@/constants/marketplace.json";
import { Marketplace_ADDRESSES } from "@/constants/config";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import GROUP_ABI from "@/constants/creator_group.json";
import USDC_ABI from "@/constants/usdc.json";
import { USDC_ADDRESS } from "@/constants/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";

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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn, isAuthenticated, user } = useAuth();
  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [usdc_contract, setUsdc_Contract] = useState<Contract | undefined>(
    undefined
  );
  const [data, setData] = useState<INFT | undefined>(undefined);
  const [groupName, setGroupName] = useState<string>("");
  const api = useAPI();
  const [groupAddress, setGroupAddress] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const [currentDutchPrice, setCurrentDutchPrice] = useState<string>("");

  const getData = async () => {
    const result = await api
      .post("/api/getNftById", { id: params.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setData(result?.data);
    console.log("data", result?.data);
    const group_name = await api
      .post("/api/getGroupId", {
        id: result?.data.groupid,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setGroupName(group_name?.data.name);
    setGroupAddress(group_name?.data.address);
    setGroupId(group_name?.data.id);
  };

  useEffect(() => {
    getData();
  }, []);
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

  const getDutchAuctionPrice = async () => {
    if (
      Number(data?.auctiontype) === 1 &&
      contract &&
      data &&
      data.status !== "sold"
    ) {
      const value = await contract.getDutchAuctionPrice(data?.listednumber);
      setCurrentDutchPrice((Number(value) / 1e18).toString());
    }
  };

  useEffect(() => {
    getDutchAuctionPrice();
  }, [contract, data]);

  const convertSecondsToTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return [days, hours, minutes, seconds];
  };

  const buyClick = async () => {
    try {
      if (!contract) throw "no contract";
      if (!usdc_contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      if (!data) throw "no data";
      setIsLoading(true);
      const tx1 = await usdc_contract.approve(
        Marketplace_ADDRESSES[chainId],
        BigInt(Number(currentDutchPrice) * 1e18)
      );
      await tx1.wait();
      const tx = await contract.buyDutchAuction(
        BigInt(data.listednumber),
        BigInt(Number(currentDutchPrice) * 1e18)
      );
      await tx.wait();
      await api
        .post("/api/updateNft", {
          id: data.id,
          owner: user.name,
          status: "sold",
          auctionType: data.auctiontype,
          initialPrice: data.initialprice,
          salePeriod: data.saleperiod,
          currentPrice: currentDutchPrice,
          currentBidder: user.name,
          reducingRate: data.reducingrate ? data.reducingrate : 0,
          listedNumber: data.listednumber,
        })
        .catch((error) => {
          toast.error(error.message);
        });

      getData();
    } catch (err: any) {
      if (String(err.code) === "ACTION_REJECTED") {
        toast.success("success");
      } else {
        toast.error(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {bidModalState && data && (
        <BidModal
          nftData={data}
          groupAddress={groupAddress}
          groupId={groupId}
          getData={getData}
        />
      )}
      {withdrawModalState && <WithdrawModal groupAddress={groupAddress} />}
      <div className="md:mt-[120px] xs:mt-[100px] font-Maxeville">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 groups md:p-[40px] xl:pt-5 xs:p-[15px]">
          {data && (
            <div className="drop-shadow-md lg:me-[40px] sm:me-0">
              <Image
                src={data.avatar}
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
          {data && (
            <div className="p-2 flex-col flex justify-between">
              <div className="flex-col">
                <div className="text-[18px] flex gap-4">
                  {data.collectionname}
                  <div className="flex items-center">
                    <TrendingIcon />
                  </div>
                </div>
                <div className="text-[18px] underline">COLLECTION</div>
                <div className="text-gray-400 mt-3">Group</div>
                <div className="text-[18px]">{groupName}</div>
                <div className="text-gray-400 mt-3">Auction Type</div>

                <div className="text-[18px]">
                  {!Number(data?.auctiontype)
                    ? "English Auction"
                    : Number(data?.auctiontype) === 1
                    ? "Dutch Auction"
                    : "Offering"}
                </div>
                <div className="text-gray-400 mt-3">Initial Price</div>
                <div className="text-[18px]">{data?.currentprice}</div>

                {Number(data?.auctiontype) === 1 && (
                  <>
                    <div className="text-gray-400 mt-3">Reducing Rate</div>
                    <div className="text-[18px]">{data?.reducingrate}</div>
                  </>
                )}
                {Number(data?.auctiontype) !== 2 && (
                  <>
                    <div className="text-gray-400 mt-3">Current Price</div>
                    <div className="text-[18px]">
                      {Number(data?.auctiontype) !== 1
                        ? data?.currentprice
                        : data?.status === "sold"
                        ? data?.currentprice
                        : currentDutchPrice}
                    </div>
                  </>
                )}
                {Number(data?.auctiontype) !== 2 && data?.status !== "sold" && (
                  <>
                    <div className="text-gray-400 mt-3">Sale Period</div>
                    <div className="text-[18px] flex gap-2">
                      {(() => {
                        const period = convertSecondsToTime(
                          Number(data?.saleperiod)
                        );

                        return period.map((item, index) => (
                          <div key={index}>
                            {index ? ": " : ""} {item >= 10 ? item : "0" + item}
                          </div>
                        ));
                      })()}
                    </div>
                  </>
                )}
                {Number(data?.auctiontype) === 0 && (
                  <>
                    <div className="text-gray-400 mt-3">Highest Bidder</div>
                    <div className="text-[18px]">{data?.currentbidder}</div>
                  </>
                )}
              </div>
              <div className="flex flex-col mt-3 mb-[35px]">
                {Number(data?.auctiontype) === 1 && data?.status !== "sold" && (
                  <button
                    className="w-full bg-[#322A44] rounded-full text-white h-[30px] text-center flex items-center justify-center"
                    onClick={buyClick}
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
                      "BUY"
                    )}
                  </button>
                )}

                {Number(data?.auctiontype) !== 1 && (
                  <div
                    className={`grid grid-cols-1 gap-1 ${
                      data?.status === "sold"
                        ? "sm:grid-cols-1"
                        : "sm:grid-cols-2"
                    }`}
                  >
                    {data?.status !== "sold" && (
                      <button
                        className="w-full bg-[#322A44] rounded-full text-white h-[30px]"
                        onClick={() => setBidModalState(true)}
                      >
                        BID
                      </button>
                    )}
                    {
                      <button
                        className="w-full bg-[#322A44] rounded-full text-white h-[30px]"
                        onClick={() => setWithdrawModalState(true)}
                      >
                        WITHDRAW
                      </button>
                    }
                  </div>
                )}
              </div>
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
          )}
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
