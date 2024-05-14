"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import NftCard from "@/components/main/cards/nftCard";
import NFTs from "@/data/nfts.json";
import { INFT } from "@/types";
import useAPI from "@/hooks/useAPI";
import { IImageWithCaption } from "@/types/images";


type Props = IImageWithCaption & {
  height: number;
}

const ImageWithCaption = ({ src, alt, caption, height }: Props) => {
  return (
    <div>
      <Image className={`object-cover md:h-[${height}px] w-full`} src={src} alt={alt} width={500} height={height} />
      <h3 className="text-left">{caption}</h3>
    </div>
  );

};


export default ImageWithCaption;
