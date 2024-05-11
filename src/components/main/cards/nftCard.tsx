import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EyeIcon from "@/components/svgs/eye_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import useLoadingControlStore from "@/store/UI_control/loading";

interface CardProps {
  avatar: string;
  collectionName: string;
  collectionId: number;
  price: number;
  seen: number;
  favorite: number;
}

const NftCard: React.FC<CardProps> = ({
  avatar,
  collectionName,
  collectionId,
  price,
  seen,
  favorite,
}) => {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  return (
    <>
      <div
        className="transition-transform duration-200 active:translate-y-1"
        onClick={() => {
          setLoadingState(true);
        }}
      >
        <div className="transition-all absolute aspect-square top-0 content-card-menu opacity-0 rounded-lg text-white bg-chocolate-main/80 w-full">
          <div>
            <div className="absolute left-4 top-4">
              {collectionName} #{collectionId}
            </div>
            <div className="absolute left-4 bottom-4">{price} USDC</div>
            <div className="absolute right-4 bottom-4 items-center gap-1 sm:gap-2 xs:hidden md:flex">
              <EyeIcon props="white" />
              {seen}
              <HeartIcon props="white" />
              {favorite}
            </div>
          </div>
        </div>
        <Image
          src={avatar}
          className="w-full h-full aspect-square object-cover rounded-lg"
          alt="market_nft"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </>
  );
};

export default NftCard;
