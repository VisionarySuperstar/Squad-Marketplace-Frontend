"use client";

import React from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import EyeIcon from "@/components/svgs/eye_icon";
import Collapse from "@/components/main/collapse";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";
import BidModal from "@/components/marketplace/modals/bidModal";
import WithdrawModal from "@/components/marketplace/modals/withdrawModal";
import Split_line from "@/components/main/split_line";

import NFTs from "@/data/nfts.json";

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

  return (
    <>
      {bidModalState && <BidModal />}
      {withdrawModalState && <WithdrawModal />}
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
          <div className="p-2 flex-col flex justify-between">
            <div className="flex-col">
              <div className="text-[18px] flex gap-4">
                NATURE
                <div className="flex items-center">
                  <TrendingIcon />
                </div>
              </div>
              <div className="text-[18px] underline">COLLECTION</div>
              <div className="text-gray-400 mt-3">Group</div>
              <div className="text-[18px]">{data?.groupName}</div>
              <div className="text-gray-400 mt-3">Auction Type</div>

              <div className="text-[18px]">
                {!auctionType
                  ? "English Auction"
                  : auctionType === 1
                  ? "Dutch Auction"
                  : "Offering"}
              </div>
              <div className="text-gray-400 mt-3">Initial Price</div>
              <div className="text-[18px]">{data?.initialPrice}</div>

              {auctionType === 1 && (
                <>
                  <div className="text-gray-400 mt-3">Reducing Rate</div>
                  <div className="text-[18px]">{data?.reducingRate}</div>
                </>
              )}
              {auctionType !== 2 && (
                <>
                  <div className="text-gray-400 mt-3">Sale Period</div>
                  <div className="text-[18px] flex gap-2">
                    {data?.salePeriod?.map((item, index) => (
                      <div key={index}>
                        {index && ": "} {item}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {!auctionType && (
                <>
                  <div className="text-gray-400 mt-3">Highest Bidder</div>
                  <div className="text-[18px]">{data?.currentBidder}</div>
                </>
              )}
            </div>
            <div className="flex flex-col mt-3 mb-[35px]">
              {auctionType === 2 && (
                <button className="w-full bg-[#322A44] rounded-full text-white h-[30px]">
                  BUY
                </button>
              )}

              {auctionType !== 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  <button
                    className="w-full bg-[#322A44] rounded-full text-white h-[30px]"
                    onClick={() => setBidModalState(true)}
                  >
                    BID
                  </button>
                  <button
                    className="w-full bg-[#322A44] rounded-full text-white h-[30px]"
                    onClick={() => setWithdrawModalState(true)}
                  >
                    WITHDRAW
                  </button>
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
