"use client";

import React, { useEffect, useState } from "react";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import BidModal from "@/components/marketplace/modals/bidModal";
import WithdrawModal from "@/components/marketplace/modals/withdrawModal";
import Split_line from "@/components/main/split_line";
import "react-photo-view/dist/react-photo-view.css";

import useAPI from "@/hooks/useAPI";
import { INFT } from "@/types";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract, ethers } from "ethers";
import Marketplace_ABI from "@/constants/marketplace.json";
import { Marketplace_ADDRESSES, NetworkId } from "@/constants/config";
import useAuth from "@/hooks/useAuth";
import USDC_ABI from "@/constants/usdc.json";
import { USDC_ADDRESS } from "@/constants/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDisplayingControlStore from "@/store/UI_control/displaying";
import useLoadingControlStore from "@/store/UI_control/loading";
import toast from "react-hot-toast";
import NftCard from "@/components/main/cards/nftCard";
import { useRouter } from "next/navigation";
import useLocalTimeZone from "@/hooks/views/useLocalTimeZone";


import Content_ABI from "@/constants/content_nft.json";
type transferHistoryType = {
  from: string;
  to: string;
  timestamp: BigInt;
};

import ImageView from "@/components/main/imageViewer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FooterBG from "@/components/main/footerbg";

const Home = ({ params }: { params: { id: string } }) => {
  const localTimeZone = useLocalTimeZone();

  const setIsDisplaying = useDisplayingControlStore(
    (state) => state.updateDisplayingState
  );
  const setMainText = useDisplayingControlStore(
    (state) => state.updateMainText
  );

  const setBidModalState = useMarketplaceUIControlStore(
    (state) => state.updateBidModal
  );
  const setWithdrawModalState = useMarketplaceUIControlStore(
    (state) => state.updateWithdrawModal
  );
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const bidModalState = useMarketplaceUIControlStore((state) => state.bidModal);
  const withdrawModalState = useMarketplaceUIControlStore(
    (state) => state.withdrawModal
  );
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { address, chainId, signer } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [usdc_contract, setUsdc_Contract] = useState<Contract | undefined>(
    undefined
  );
  const [contentContract, setContentContract] = useState<Contract | undefined>(
    undefined
  );
  const [data, setData] = useState<INFT | undefined>(undefined);
  const [groupName, setGroupName] = useState<string>("");
  const api = useAPI();
  const [groupAddress, setGroupAddress] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");

  const [currentDutchPrice, setCurrentDutchPrice] = useState<string>("");
  const [remainTime, setRemainTime] = useState<number | undefined>(undefined);
  const [selectedNFTS, setSelectedNFTS] = useState<INFT[] | undefined>(
    undefined
  );
  const [transferHistory, setTransferHistory] = useState<transferHistoryType[]>(
    []
  );
  const [ownedName, setOwnedName] = useState<string[]>([]);
  const [displayingTime, setDisplayingTime] = useState<string[]>([]);
  const getListedNFTs = async () => {
    if (groupId) {
      console.log("groupId", groupId);
      const listNftResponse = await api.post("/api/getNftByGroupAndStatus", {
        id: groupId,
        status: "list",
      });
      console.log("listNftResponse", listNftResponse.data);
      setSelectedNFTS(listNftResponse?.data);
    }
  };
  useEffect(() => {
    getListedNFTs();
  }, [groupId]);
  const formatDateWithTimeZone = (
    timestampInSeconds: number,
    timeZone: string
  ) => {
    // Convert the timestamp to milliseconds
    const timestampInMilliseconds = timestampInSeconds * 1000;
    console.log("timestampInMilliseconds", timestampInMilliseconds);
    // Create a new Date object
    let date = new Date(timestampInMilliseconds);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: timeZone,
      timeZoneName: "short",
    };

    // Format the date and time
    const dateString = date.toLocaleString("en-US", options);

    return dateString;
  };
  const getData = async () => {
    console.log("getData");
    const result = await api
      .post("/api/getNftById", { id: params.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setData(result?.data);
    console.log("data", result?.data);
    const group_name = await api
      .post("/api/getGroupById", {
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
    setLoadingState(false);
    // Set up an interval to decrease the value every second
    const intervalId = setInterval(() => {
      setRemainTime((prevValue?) => (prevValue ? prevValue - 1 : 0));
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
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

  const calcRemainTime = async () => {
    if (!contract) return;
    if (!data) return;
    if (Number(data.auctiontype) === 2) return;
    if (data.status === "sold") {
      return;
    }
    const nftInContract = await contract.listedNFTs(
      BigInt(data?.marketplacenumber || 0)
    );
    const startTime = Number(String(nftInContract.startTime));
    console.log("startTime", startTime);
    const endTime = startTime + Number(data.saleperiod);
    console.log("endTime", endTime);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("currentTime", currentTime);
    setRemainTime(endTime - currentTime);
  };
  const getWithdrawAmounts = async () => {
    if (!contract || !data) return;
    if (Number(data.auctiontype) === 0) {
      const value = await contract.withdrawBalanceForEnglishAuction(
        BigInt(data.listednumber),
        user?.wallet
      );
      console.log("value ", value);
      setWithdrawAmount((Number(value) / 1e6).toString());
    } else if (Number(data.auctiontype) === 2) {
      const value = await contract.withdrawBalanceForOfferingSale(
        BigInt(data.listednumber),
        user?.wallet
      );
      console.log("value ", value);
      setWithdrawAmount((Number(value) / 1e6).toString());
    }
  };
  const getDutchAuctionPrice = async () => {
    if (
      Number(data?.auctiontype) === 1 &&
      contract &&
      data &&
      data.status !== "sold"
    ) {
      const value = await contract.getDutchAuctionPrice(data?.listednumber);
      setCurrentDutchPrice((Number(value) / 1e6).toString());
    }
  };
  useEffect(() => {
    calcRemainTime();
    getWithdrawAmounts();
    getDutchAuctionPrice();
  }, [contract, data]);

  useEffect(() => {
    if (!address || !chainId || !signer || !data) {
      return;
    }
    if (data.collectionaddress) {
      const _contract = new Contract(
        data.collectionaddress,
        Content_ABI,
        signer
      );
      setContentContract(_contract);
    }
  }, [address, chainId, signer, data, user]);

  const getHistory = async () => {
    if (!contentContract) return;
    const transaction_history: transferHistoryType[] =
      await contentContract.getTransferHistory(
        BigInt(String(data?.collectionid))
      );
    console.log("transaction_history", transaction_history);
    setTransferHistory(transaction_history);
    setOwnedName(
      await Promise.all(
        transaction_history.map(
          async (index: transferHistoryType, key: number) =>
            await getUserName(index.to, key)
        )
      )
    );
    setDisplayingTime(
      await Promise.all(
        transaction_history.map(
          async (index: transferHistoryType, key: number) =>
            await formatDateWithTimeZone(
              Number(index.timestamp),
              localTimeZone?localTimeZone:"America/New_York"
            )
        )
      )
    );
  };
  function shortenAddress(address: string) {
    // Check if the address is valid
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (!regex.test(address)) {
      return "Invalid Ethereum address";
    }

    // Truncate the address after 6 characters
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  }
  const getUserName = async (address: string, key: number) => {
    console.log("key", key);
    if (!key) {
      const result = await api.post("/api/getGroupByAddress", { id: address });
      console.log("here name is ", result.data.name);
      if (result.data.name) return result.data.name;
    }

    const result = await api.post("/api/auth/user/getUserByAddress", {
      id: address,
    });
    if (result.data.name) return result.data.name;
    else return shortenAddress(address);
  };
  useEffect(() => {
    if (!contentContract) return;
    getHistory();
  }, [contentContract]);

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
      setIsDisplaying(true);
      setMainText("Waiting for user confirmation...");
      const tx1 = await usdc_contract.approve(
        Marketplace_ADDRESSES[chainId],
        BigInt(Number(currentDutchPrice) * 1e6)
      );
      setMainText("Waiting for transaction confirmation...");
      await tx1.wait();
      setMainText("Waiting for user confirmation...");
      const tx = await contract.buyDutchAuction(
        BigInt(data.listednumber),
        BigInt(Number(currentDutchPrice) * 1e6)
      );
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      setMainText("Waiting for backend process...");
      await api
        .post("/api/updateSoldNft", {
          id: data.id,
          owner: user.id,
          status: "sold",
          currentPrice: currentDutchPrice,
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
      setIsDisplaying(false);
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
          withdrawAmount={withdrawAmount}
        />
      )}
      {withdrawModalState && data && (
        <WithdrawModal nftData={data} withdrawAmount={withdrawAmount} />
      )}
      <div className="md:mt-[120px] xs:mt-[100px] font-Maxeville">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 groups md:p-[40px] xl:pt-5 xs:p-[15px]">
          {data && (
            <div className="lg:me-[40px] sm:me-0">
              <div>
                <ImageView avatar={data.content} />
              </div>
            </div>
          )}
          {data && (
            <div className="p-2 flex-col flex justify-between">
              <div className="flex-col">
                <div className="text-[18px] flex gap-4">
                  {data.name}
                  <div className="flex items-center">
                    <TrendingIcon />
                  </div>
                </div>
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
                <div className="text-[18px]">{data?.initialprice}</div>

                {Number(data?.auctiontype) === 1 && (
                  <>
                    <div className="text-gray-400 mt-3">Reducing Rate</div>
                    <div className="text-[18px]">{data?.reducingrate}</div>
                  </>
                )}
                {Number(data?.auctiontype) !== 2 && (
                  <>
                    <div className="text-gray-400 mt-3">{data?.status === "sold"?"Sold":"Current"} Price</div>
                    <div className="text-[18px]">
                      {Number(data?.auctiontype) !== 1
                        ? data?.currentprice
                        : data?.status === "sold"
                        ? data?.currentprice
                        : currentDutchPrice}
                    </div>
                  </>
                )}
                {data?.status === "sold" && (
                  <div className="text-gray-400 mt-3">Already Finished</div>
                )}
                {Number(data?.auctiontype) !== 2 && data?.status !== "sold" && (
                  <>
                    {(remainTime && remainTime <= 0) || remainTime === 0 ? (
                      <div className="text-gray-400 mt-3">Already Finished</div>
                    ) : (
                      <>
                        <div className="text-gray-400 mt-3">Sale Ends In</div>

                        <div className="text-[18px] flex gap-2">
                          {(() => {
                            const period = convertSecondsToTime(
                              Number(remainTime)
                            );

                            return period.map((item, index) => (
                              <div key={index}>
                                {index ? ": " : ""}{" "}
                                {item >= 10 ? item : "0" + item}
                              </div>
                            ));
                          })()}
                        </div>
                      </>
                    )}
                  </>
                )}

                {Number(data?.auctiontype) === 0 &&
                  data?.currentbidder !== "0x000" && (
                    <>
                      <div className="text-gray-400 mt-3">Highest Bidder</div>
                      <div className="text-[18px]">{data?.currentbidder}</div>
                    </>
                  )}
              </div>
              <div className="flex flex-col mt-3 mb-[35px]">
                {Number(data?.auctiontype) === 1 &&
                  data?.status !== "sold" &&
                  remainTime && (
                    <button
                      className="w-full bg-[#000] rounded-full text-white h-[30px] text-center flex items-center justify-center"
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
                        className="w-full bg-[#000] rounded-full text-white h-[30px]"
                        onClick={() => setBidModalState(true)}
                      >
                        BID
                      </button>
                    )}
                    {Number(withdrawAmount) > 0 && (
                      <button
                        className="w-full bg-[#000] rounded-full text-white h-[30px]"
                        onClick={() => setWithdrawModalState(true)}
                      >
                        WITHDRAW
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="">
                <Collapse title="Description">
                  <p className="text-gray-400">{data?.description}</p>
                </Collapse>
                <Collapse title="History">
                  <p className="text-gray-400">
                    Minted by{" "}
                    <span className="text-xl text-black-main">
                      {groupName + " "}
                    </span>
                    {formatDateWithTimeZone(
                      Number(data?.created_at),
                      localTimeZone?localTimeZone:"America/New_York"
                    )}
                  </p>
                  {transferHistory.length >= 1 &&
                    transferHistory.map(
                      (item: transferHistoryType, key: number) => {
                        return (
                          <p key={key} className="text-gray-400">
                            {key === transferHistory.length - 1
                              ? "Owner"
                              : "Owned"}{" "}
                            <span className="text-xl text-black-main">
                              {ownedName[key]}
                            </span>{" "}
                            {displayingTime && "\t" + displayingTime[key]}
                          </p>
                        );
                      }
                    )}
                </Collapse>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="page_container_p40 mt-5">
          <Split_line />
          <h1 className="text-xl my-[30px] font-Maxeville">
            MORE FROM THIS GROUP
          </h1>

          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
          >
            {selectedNFTS
              ?.filter((_nft: INFT) => _nft.id !== params.id)
              .map((item, index) => (
                <div key={index}>
                  <SwiperSlide>
                    <NftCard
                      key={index}
                      id={item.id}
                      content={item.content}
                      name={item.name}
                      description={item.description}
                      price={parseInt(item.currentprice)}
                      seen={200}
                      favorite={20}
                    />
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
        </div>
      </div>
      <FooterBG />
    </>
  );
};

export default Home;
