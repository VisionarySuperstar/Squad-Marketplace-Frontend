"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const Carousel_Component = () => {
  return (
    <>
      <div className="w-full h-[90vh] min-h-[800px]" id="marketplace_carousel">
        <Image
          alt="slide"
          width={2000}
          height={2000}
          src="/assets/images/slide/1.jpg"
          className="object-cover w-full h-full"
        />
      </div>
    </>
  );
};

export default Carousel_Component;
