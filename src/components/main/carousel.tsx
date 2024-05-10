"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
import { useEffect, useState } from "react";
const Carousel_Component = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="w-full h-[90vh] min-h-[800px]" id="marketplace_carousel">
        <Slider {...settings}>
          <Image
            alt="slide"
            width={2000}
            height={2000}
            src="/assets/images/slide/1.jpg"
            className="object-cover w-full h-full"
          />
          <Image
            alt="slide"
            width={2000}
            height={2000}
            src="/assets/images/slide/2.jpg"
            className="object-cover w-full h-full"
          />
          <Image
            alt="slide"
            width={2000}
            height={2000}
            src="/assets/images/slide/3.jpg"
            className="object-cover w-full h-full"
          />
        </Slider>
      </div>
    </>
  );
};

export default Carousel_Component;
