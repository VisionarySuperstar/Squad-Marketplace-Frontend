"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import { useEffect, useState } from "react";
const Carousel_Component = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = ["image1.png", "image2.png", "image3.png"]

  return (
    <>
      <div className="w-full bg-black" id="marketplace_carousel">
        <Slider {...settings}>
          {images.map((image, index) => {
            return (
              <div key={index} className="pt-5 px-10">
                <Image
                  alt="slide"
                  height={1000}
                  width={1000}
                  src={`/assets/images/slide/${image}`}
                  className="object-contain  mx-auto max-h-[100vh] "
                />
              </div>)
          })}
        </Slider>
      </div>
    </>
  );
};

export default Carousel_Component;
