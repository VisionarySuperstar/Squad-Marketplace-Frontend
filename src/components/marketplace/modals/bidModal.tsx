"use client";

import react, { useState } from "react";
import Image from "next/image";
import MyGroups from "@/data/mygroups.json";
import useMarketplaceUIControlStore from "@/store/UI_control/marketplacePage/marketplaceModal";

const BidGroupModal = () => {
    const setBidModalState = useMarketplaceUIControlStore((state) => state.updateBidModal);
    const setWithdrawModalState = useMarketplaceUIControlStore((state) => state.updateWithdrawModal);
    const bidModalState = useMarketplaceUIControlStore((state) => state.bidModal);
    const withdrawModalState = useMarketplaceUIControlStore((state) => state.withdrawModal);
    const seletedGroup = MyGroups[3];
    const [bidAmount, setBidAmount] = useState<string>("");
    const handleBidClick = () => {
        setBidModalState(false) ;
    }
    return (
        <div className="">
            <div
                className="join_background"
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
                            <input value={bidAmount} onChange={(e) =>
                                setBidAmount(e.target.value)} className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main" type="text" placeholder="3000" />
                        </div>
                        <div className="flex items-center justify-center text-[20px]">USDC</div>
                    </div>
                    <div className="flex justify-center items-center mt-5 mb-5">
                        <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg" onClick={handleBidClick}>
                            PLACE BID
                        </button>
                    </div>
                </div>
            </div>

        </div>


    )
};

export default BidGroupModal;