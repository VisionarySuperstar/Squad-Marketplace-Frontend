/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import Split_line from "@/components/main/split_line";
import NFTs from "@/data/nfts.json";

import { INFT, IGROUP, IUSER } from "@/types";
import useAuth from "@/hooks/useAuth";
import useAPI from "@/hooks/useAPI";
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
  const data = NFTs.find((nft) => nft.id === params.id);
  const auctionType = data?.auctionType;
  const [nftData, setNftData] = useState<INFT>();
  const [groupName, setGroupName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const api = useAPI();

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
      .post("/auth/user/getUserByAddress", {
        id: result?.data.owner,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setOwnerName(result2?.data.name);
  };

  useEffect(() => {
    getNftData();
  }, []);

  return (
    <>
      <div className="md:mt-[120px] xs:mt-[100px] font-Maxeville">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 groups md:p-[40px] xl:pt-5 xs:p-[15px]">
          {nftData && (
            <div className="drop-shadow-md lg:me-[40px] sm:me-0">
              <Image
                src={nftData.avatar}
                className="md:h-[70vh] w-full object-cover"
                alt="group_avatar"
                width={706}
                height={706}
                sizes="100vw"
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
              <div className="text-gray-400 mt-3">Current Owner</div>
              <div className="text-[18px]">
                {ownerName ? ownerName : nftData?.owner}
              </div>
            </div>
            <div className="flex flex-col mb-[35px]">
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
      </div>
      <div
        className="mt-[-400px] bg-cover bg-no-repeat h-[720px] w-full -z-10"
        style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
      ></div>
    </>
  );
};

export default Home;
