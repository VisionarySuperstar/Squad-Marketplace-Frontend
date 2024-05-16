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
        className="transition-transform duration-200 active:translate-y-1 aspect-square"
        onClick={() => {
          setLoadingState(true);
        }}
      >
        <div className="transition-all absolute aspect-square top-0 left-0 content-card-menu opacity-0 text-white bg-chocolate-main/80 w-full">
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
        <div className="bg-white w-full h-full flex justify-center">
          <Image
            src={avatar}
            alt={"nft"}
            width={300}
            height={300}
            className=" object-fill w-auto h-full"
          />
        </div>
      </div>
    </>
  );
};

export default NftCard;
