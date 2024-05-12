import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoadingControlStore from "@/store/UI_control/loading";

interface CardProps {
  state: string;
  name: string;
  membercount: number;
  groupBio: string;
  groupId: string;
  avatar: string;
}

const GroupCard: React.FC<CardProps> = ({
  state,
  name,
  groupId,
  avatar,
  membercount,
  groupBio,
}) => {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const router = useRouter();

  const handleClick = () => {
    setLoadingState(true);
    if (state === "1") {
      router.push(`groups/public_profile/${groupId}`);
    } else if (state === "2") {
      router.push(`groups/private_profile/${groupId}`);
    }
  };

  return (
    <>
      <div
        className="transition-transform duration-200 transform text-sm cursor-pointer group-card font-Maxeville text-white active:translate-y-1"
        onClick={handleClick}
      >
        <div className="w-full aspect-square flex justify-center items-center">
          {state === "0" ? (
            <div>
              <div>NEW GROUP</div>
              <div className="text-center">+</div>
            </div>
          ) : (
            <div className="aspect-square w-full h-full relative ">
              <div className="absolute top-0 z-10 w-full h-full bg-chocolate-main/80 opacity-0 transition-all group-card-info p-[15px] ">
                <div>GROUP BIO</div>
                <div className="mt-[5px] lg:max-h-[70%] xs:max-h-[50%]  overflow-y-auto scrollbar break-all">
                  {groupBio}
                </div>
                <div className="absolute bottom-[15px]">
                  {membercount} MEMEBERS
                </div>
              </div>
              <Image
                src={avatar}
                className="w-full h-full shadow-md object-cover aspect-square "
                alt="avatar"
                width={500}
                height={500}
              />
            </div>
          )}
        </div>
        {state !== "0" && <div className="mt-3 text-black">{name}</div>}
      </div>
    </>
  );
};

export default GroupCard;
