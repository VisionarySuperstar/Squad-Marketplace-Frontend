/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import Split_line from "@/components/main/split_line";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ListModal from "@/components/main/modals/groups/listModal";
import { INFT, IGROUP, IUSER } from "@/types";
import useAuth from "@/hooks/useAuth";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import useLoadingControlStore from "@/store/UI_control/loading";
import ImageView from "@/components/main/imageViewer";
import FooterBG from "@/components/main/footerbg";
import { Contract, ethers } from "ethers";
import Content_ABI from "@/constants/content_nft.json";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import useLocalTimeZone from "@/hooks/views/useLocalTimeZone";


type transferHistoryType = {
  from: string;
  to: string;
  timestamp: BigInt;
};
const Home = ({ params }: { params: { id: string } }) => {
  const [transferHistory, setTransferHistory] = useState<transferHistoryType[]>(
    []
  );
  const setListModalState = useGroupUIControlStore(
    (state) => state.updateListModal
  );
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const listModalState = useGroupUIControlStore((state) => state.listModal);

  const { signIn, isAuthenticated, user } = useAuth();

  const [nftData, setNftData] = useState<INFT>();
  const [groupName, setGroupName] = useState<string>("");
  const [groupAddress, setGroupAddress] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [isDirector, setIsDirector] = useState<boolean>(false);
  const api = useAPI();
  const { address, chainId, signer, chain, provider } = useActiveWeb3();
  const [contentContract, setContentContract] = useState<Contract | undefined>(
    undefined
  );
  const [ownedName, setOwnedName] = useState<string[]>([]);
  const [displayingTime, setDisplayingTime] = useState<string[]>([]);
  const timeZone = useLocalTimeZone();

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
  const getNftData = async () => {
    const result = await api
      .post("/api/getNftById", { id: params.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setNftData(result?.data);
    console.log("auctiontype", result?.data.auctiontype);
    console.log("result", result);
    const result1 = await api
      .post("/api/getGroupById", {
        id: result?.data.groupid,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setGroupName(result1?.data.name);
    setGroupAddress(result1?.data.address);
    if (user?.id === result1?.data.director) setIsDirector(true);
    const result2 = await api
      .post("/api/auth/user/getUserByAddress", {
        id: result?.data.owner,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setOwnerName(result2?.data.name);
  };

  useEffect(() => {
    getNftData();
    setLoadingState(false);
  }, []);
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
  useEffect(() => {
    if (!contentContract) return;
    getHistory();
  }, [contentContract]);
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
              timeZone?timeZone:"America/New_York"
            )
        )
      )
    );
  };

  return (
    <>
      {listModalState && nftData && (
        <ListModal listNft={nftData} groupAddress={groupAddress} />
      )}

      <div className="mt-[120px] font-Maxeville">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 p-[40px] xl:pt-5">
          {nftData && (
            <div className="lg:me-[40px] sm:me-0">
              <div className="flex justify-center">
                <ImageView avatar={nftData.content} />
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
                {nftData?.name}
                <div className="flex items-center">
                  <TrendingIcon />
                </div>
              </div>
              <div className="text-gray-400 mt-3">Group</div>
              <div className="text-[18px]">{groupName}</div>
            </div>
            <div className="flex flex-col mb-[35px]">
              {/* <div>DESCRIPTION</div> */}
              <div className="">
                {isDirector && (
                  <button
                    onClick={() => setListModalState(true)}
                    className="w-full bg-green-500 rounded-full text-white h-[30px] mb-5"
                  >
                    LIST TO MARKETPLACE
                  </button>
                )}
                <div className="mt-[20px] border-[1px] border-[#000]"></div>
                <Collapse title="Description">
                  <p className="text-gray-400">{nftData?.description}</p>
                </Collapse>
                <Collapse title="History">
                  <p className="text-gray-400">
                    Minted by{" "}
                    <span className="text-xl text-black-main">
                      {groupName + " "}
                    </span>
                    {formatDateWithTimeZone(
                      Number(nftData?.created_at),
                      timeZone?timeZone:"America/New_York"
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
          </div>
        </div>
      </div>
      <FooterBG />
    </>
  );
};

export default Home;
