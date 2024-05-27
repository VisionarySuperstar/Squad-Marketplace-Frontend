"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel_Component from "@/components/main/carousel";

const ImageHero = () => {
  const [counter, setCounter] = useState(0);

  const images = [
    "image1.png",
    "image2.png",
    "image3.png",
    "image4.png",
    "image5.png",
    "image6.png",
  ];
  const displayed = images.slice(0, counter + 1);

  const layouts = [
    ["col-start-2 col-span-2 row-span-2"],
    ["col-span-2 row-span-2", "col-start-3 col-span-2 row-span-2"],
    [
      "col-span-2 row-span-2",
      "col-start-3 col-span-2",
      "col-start-3 col-span-2 row-start-2",
    ],
    [
      "col-span-2 row-span-2",
      "col-start-3 col-span-2",
      "pt-5 col-start-3 row-start-2",
      "col-start-4 row-start-2",
    ],
  ];
  const layout = layouts[counter];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <div
      className="grid grid-cols-4 grid-rows-2 gap-5 w-full bg-black h-[100vh] py-10 transition-all"
      id="imagehero"
    >
      {displayed.map((image, index) => {
        return (
          <div key={index} className={`pt-5 px-10 ${layout[index]}`}>
            <Image
              alt="image"
              height={1000}
              width={1000}
              src={`/assets/images/slide/${image}`}
              className="object-contain mx-auto max-h-[95%] transition-all"
            />
            <h3 className="text-white text-center pt-4">
              Spotlight: Juergen teller for Loewe
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ImageHero;
