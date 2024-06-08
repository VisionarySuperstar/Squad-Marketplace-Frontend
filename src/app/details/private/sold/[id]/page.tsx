/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import Split_line from "@/components/main/split_line";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { INFT } from "@/types";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import useLoadingControlStore from "@/store/UI_control/loading";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract, ethers } from "ethers";
import USDC_ABI from "@/constants/usdc.json";
import { USDC_ADDRESS } from "@/constants/config";
import Content_ABI from "@/constants/content_nft.json";

type transferHistoryType = {
  from: string;
  to: string;
  timestamp: BigInt;
};
import Marketplace_ABI from "@/constants/marketplace.json";
import { Marketplace_ADDRESSES, NetworkId } from "@/constants/config";

const Home = ({ params }: { params: { id: string } }) => {
  const [transferHistory, setTransferHistory] = useState<transferHistoryType[]>(
    []
  );
  const [ownedName, setOwnedName] = useState<string[]>([]);
  const [displayingTime, setDisplayingTime] = useState<string[]>([]);
  const [nftData, setNftData] = useState<INFT>();
  const [groupName, setGroupName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const api = useAPI();
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const getNftData = async () => {
    const result = await api
      .post("/api/getNftById", { id: params.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setNftData(result?.data);
    console.log("result", result);
    const result1 = await api
      .post("/api/getGroupId", {
        id: result?.data.groupid,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setGroupName(result1?.data.name);
    const result2 = await api
      .get(`/api/auth/user/${result?.data.owner}`)
      .catch((error) => {
        toast.error(error.message);
      });

    setOwnerName(result2?.data.name);
  };

  useEffect(() => {
    getNftData();
    setLoadingState(false);
  }, []);

  function shortenAddress(address: string) {
    // Check if the address is valid
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (!regex.test(address)) {
      return "Invalid Ethereum address";
    }

    // Truncate the address after 6 characters
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  }

  const { address, chainId, signer, chain, provider } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [usdc_contract, setUsdc_Contract] = useState<Contract | undefined>(
    undefined
  );
  const [contentContract, setContentContract] = useState<Contract | undefined>(
    undefined
  );

  const calcTimeFromBlockNumber = async (blockNumber: number) => {
    const block = await provider.getBlock(blockNumber);
    return Number(block.timestamp) * 1000;
  };
  const formatDateWithTimeZone = async (
    timestampInSeconds: number,
    timeZone: string
  ) => {
    // Convert the timestamp to milliseconds
    const timestampInMilliseconds = timestampInSeconds * 1000;

    // Create a new Date object
    let date = new Date(timestampInMilliseconds);
    if (date.getFullYear() < 2024) {
      const blockTime = await calcTimeFromBlockNumber(timestampInSeconds);
      date = new Date(blockTime);
    }
    // Define options for formatting
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

  const getUserName = async (address: string, key: number) => {
    console.log("key", key);
    if (!key) {
      const result = await api.post("/api/getGroupAddress", { id: address });
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
    if (!address || !chainId || !signer || !nftData) {
      return;
    }
    const _contract = new Contract(
      nftData.collectionaddress,
      Content_ABI,
      signer
    );
    setContentContract(_contract);
  }, [address, chainId, signer, nftData]);
  const getHistory = async () => {
    if (!contentContract) return;
    const transaction_history: transferHistoryType[] =
      await contentContract.getTransferHistory(
        BigInt(String(nftData?.collectionid))
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
              "America/New_York"
            )
        )
      )
    );
  };

  return (
    <>
      <div className="md:mt-[120px] xs:mt-[100px] font-Maxeville">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 groups md:p-[40px] xl:pt-5 xs:p-[15px]">
          {nftData && (
            <div className="lg:me-[40px] sm:me-0">
              <div className="flex justify-center">
                <PhotoProvider bannerVisible={false}>
                  <PhotoView src={nftData.avatar}>
                    <Image
                      src={nftData.avatar}
                      className="md:h-[70vh] object-contain w-auto"
                      alt="group_avatar"
                      width={706}
                      height={706}
                    />
                  </PhotoView>
                </PhotoProvider>
              </div>
              <Split_line />
              <div>
                <div className="flex items-center gap-3 p-2">
                  <EyeIcon props="#000" />
                  <div>200</div>
                  <div>WATCHING</div>
                  <HeartIcon fill="#000" />
                  <div>20</div>
                </div>
              </div>
            </div>
          )}
          <div className="p-2 flex-col flex justify-between">
            <div className="flex-col">
              <div className="text-[18px] flex gap-4">
                {nftData?.collectionname} #{nftData?.collectionid}
                <div className="flex items-center">
                  <TrendingIcon />
                </div>
              </div>
              <div className="text-gray-400 mt-3">Group</div>
              <div className="text-[18px]">{groupName}</div>
              <div className="text-gray-400 mt-3">Current Owner</div>
              <div className="text-[18px]">
                {ownerName ? ownerName : nftData?.owner}
              </div>
              <div className="text-gray-400 mt-3">Auction Type</div>

              <div className="text-[18px]">
                {Number(nftData?.auctiontype) === 0
                  ? "English Auction"
                  : Number(nftData?.auctiontype) === 1
                  ? "Dutch Auction"
                  : "Offering"}
              </div>
              <div className="text-gray-400 mt-3">Sold Price</div>
              <div className="text-[18px]">{nftData?.currentprice}</div>
            </div>
            <div className="flex flex-col mb-[35px]">
              <Split_line />
              {/* <div>DESCRIPTION</div> */}
              <div className="">
                <Collapse title="Description">
                  <p>This is the content of the first collapsible section.</p>
                </Collapse>
                <Collapse title="History">
                  {transferHistory.length &&
                    transferHistory.map(
                      (item: transferHistoryType, key: number) => {
                        return (
                          <p key={key} className="text-gray-400">
                            {!key
                              ? "Creator"
                              : key === transferHistory.length - 1
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
