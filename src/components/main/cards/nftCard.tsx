import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EyeIcon from "@/components/svgs/eye_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import useLoadingControlStore from "@/store/UI_control/loading";
import { INFTCard } from "@/types/nft";

type Props = INFTCard & {
  basePath?: string;
};

const NftCard: React.FC<Props> = ({
  id,
  content,
  name,
  description,
  price,
  seen,
  favorite,
  basePath = "/details/public",
}) => {
  const router = useRouter();
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
  return (
    <div
      className="relative text-md content-card cursor-pointer"
      onClick={() => {
        console.log("clicked");
        router.push(`${basePath}/${id}`);
      }}
    >
      <div
        className="transition-transform duration-200 active:translate-y-1 aspect-square"
        onClick={() => {
          setLoadingState(true);
        }}
      >
        <div className="transition-all absolute aspect-square top-0 left-0 content-card-menu opacity-0 text-white bg-black-main/80 w-full z-10 rounded-lg">
          <div>
            <div className="absolute left-4 top-4">{name}</div>
            <div className="absolute left-4 bottom-4">{price} USDC</div>
            <div className="absolute right-4 bottom-4 items-center gap-1 sm:gap-2 xs:hidden md:flex">
              <EyeIcon props="white" />
              {seen}
              <HeartIcon fill="white" />
              {favorite}
            </div>
          </div>
        </div>
        <div className="bg-white w-full h-full flex justify-center rounded-lg">
          {!imageLoaded && (
            <div className="w-full h-full absolute top-0 left-0 bg-white rounded-lg">
              <div className="animated-background"></div>
            </div>
          )}

          <Image
            src={content}
            alt={"nft"}
            width={300}
            height={300}
            // className="object-contain w-auto"
            className=" object-cover aspect-square w-full h-full rounded-lg"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default NftCard;
