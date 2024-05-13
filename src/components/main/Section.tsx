"use client";

import Image from "next/image";
import { useEffect, useState } from "react"
import ImageWithCaption from "./ImageWithCaption";
import { IImageWithCaption } from "@/types/images";

type Props = {
  title: string;
  viewAllUrl: string;
  itemsPerRow: number;
  images: IImageWithCaption[];
};

const Section = ({ title, viewAllUrl, itemsPerRow, images }: Props) => {
  const fillerElementsCount = (itemsPerRow - (images.length % itemsPerRow)) % itemsPerRow;
  const fillerArray = Array(fillerElementsCount).fill(0);
  const containerClassName = `max-w-full flex-grow-0 flex-shrink-0 sm:basis-1 ${itemsPerRow === 3 ? 'md:basis-[31%]' : 'md:basis-[23%]'}`;

  return (
    <div className="my-5">
      <div id="top" className="flex justify-between">
        <h2>{title}</h2>
        <h2><a href={viewAllUrl}>VIEW ALL</a></h2>
      </div>
      <div className="flex flex-wrap gap-x-[0.5%] justify-between items-center">
        {images.map((image, index) =>
          <div key={index} className={containerClassName}>
            <ImageWithCaption height={500} {...image} />
          </div>
        )}
        {fillerArray.map((_, index) => <div key={index} className={`${containerClassName} invisible`} />)}
      </div>
    </div>
  )

};

export default Section;
