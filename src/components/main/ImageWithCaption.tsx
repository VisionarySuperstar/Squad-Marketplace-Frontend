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
  imageStyle?: string;
  captionColor?: string;
  captionAlign?: string;
}

const ImageWithCaption = ({ src, alt, caption, height, imageStyle = "", captionColor = "text-black", captionAlign = "text-left" }: Props) => {
  return (
    <div className="h-full">
      <Image className={`mx-auto ${imageStyle}`} src={src} alt={alt} width={500} height={height} />
      <h3 className={`${captionAlign} ${captionColor}`}>{caption}</h3>
    </div>
  );

};


export default ImageWithCaption;
