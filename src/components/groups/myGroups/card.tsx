import React from "react";
import Image from "next/image";

interface CardProps {
  state: string;
  name: string;
  groupId: number;
  avatar: string;
}

import { useRouter } from "next/navigation";

const Card: React.FC<CardProps> = ({ state, name, groupId, avatar }) => {
  const router = useRouter();

  const handleClick = () => {
    if (state === "1") {
      router.push(`groups/public_profile/${groupId}`);
    } else if (state === "2") {
      router.push(`groups/private_profile/${groupId}`);
    }
  };

  return (
    <div className="text-sm" onClick={handleClick}>
      <div className="bg-gray-400 w-full aspect-square flex justify-center items-center">
        {state === "0" ? (
          <div>
            <div>NEW GROUP</div>
            <div className="text-center">+</div>
          </div>
        ) : (
          <div className="bg-gray-500 aspect-square rounded-full w-full h-full">
            <Image
              src={avatar}
              className="w-full h-full"
              alt="avatar"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
      {state !== "0" && <div className="mt-3">{name}</div>}
    </div>
  );
};

export default Card;
