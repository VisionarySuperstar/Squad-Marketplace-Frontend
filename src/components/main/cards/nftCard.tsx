import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EyeIcon from "@/components/svgs/eye_icon";
import HeartIcon from "@/components/svgs/heart_icon";

interface CardProps {
  name: string;
  avatar: string;
}

const NftCard: React.FC<CardProps> = ({ name, avatar }) => {
  return (
    <>
      <div className="absolute aspect-square top-0 content-card-menu opacity-0 transition-all rounded-lg text-white bg-chocolate-main/80 w-full">
        <div>
          <div className="absolute left-4 top-4">COLLECTION ID</div>
          <div className="absolute left-4 bottom-4">3000 USDC</div>
          <div className="absolute right-4 bottom-4 flex items-center gap-1 sm:gap-2 xs:hidden">
            <EyeIcon props="white" />
            200
            <HeartIcon props="white" />
            20
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
      <div className="mt-3">{name}</div>
    </>
  );
};

export default NftCard;
