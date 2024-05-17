"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import { useEffect, useState } from "react";
import ImageWithCaption from "./ImageWithCaption";

type Props = {
  hasCaption: boolean;
};

const Carousel_Component = ({ hasCaption }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = ["image1.png", "image3.png"];

  return (
    <div
      className="w-full bg-black h-screen lg:h-screen inherit-height pt-[80px]"
      id="marketplace_carousel"
    >
      <div className="z-[150]">
        <Slider {...settings}>
          {images.map((image, index) => {
            return (
              <>
                <div
                  key={index}
                  className="pt-5 px-10 h-full pb-5 drop-shadow-xl"
                >
                  {hasCaption ? (
                    <ImageWithCaption
                      src={`/assets/images/slide/${image}`}
                      alt="slide"
                      caption="Spotlight:
              Juergen teller for Loewe"
                      imageStyle="h-[92%] object-cover w-auto mb-5"
                      captionColor="text-white"
                      captionAlign="text-center"
                      height={800}
                    />
                  ) : (
                    <Image
                      alt="slide"
                      height={1000}
                      width={1000}
                      src={`/assets/images/slide/${image}`}
                      className="h-full object-cover w-auto mx-auto"
                    />
                  )}
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel_Component;
