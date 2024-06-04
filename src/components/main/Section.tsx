"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
type Props<T> = {
  title: string;
  viewAllUrl: string;
  itemsPerRow: number;
  images: T[];
  renderCard: (image: T) => JSX.Element;
};

const Section = <T,>({
  title,
  viewAllUrl,
  itemsPerRow,
  images,
  renderCard,
}: Props<T>) => {
  const fillerElementsCount =
    (itemsPerRow - (images.length % itemsPerRow)) % itemsPerRow;
  const fillerArray = Array(fillerElementsCount).fill(0);
  const containerClassName = `max-w-full flex-grow-0 flex-shrink-0 sm:basis-1 ${
    itemsPerRow === 3 ? "md:basis-[31%]" : "md:basis-[23%]"
  }`;

  return (
    <div className="my-5">
      <div id="top" className="flex justify-between mb-2">
        <h2>{title}</h2>
        {/* <h2>
          <a href={viewAllUrl}>VIEW ALL</a>
        </h2> */}
      </div>

      {title === "TOP NFTS" || title === "TOP GROUPS" ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log("swiper", swiper)}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {images.map((image, index) => (
            <div key={index}>
              <SwiperSlide>
                <div key={index} className={containerClassName}>
                  {renderCard(image)}
                </div>
              </SwiperSlide>
            </div>
          ))}
          {fillerArray.map((_, index) => (
            <div key={index} className={`${containerClassName} invisible`} />
          ))}
        </Swiper>
      ) : (
        <div className="grid gap-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className={containerClassName}>
              {renderCard(image)}
            </div>
          ))}
          {fillerArray.map((_, index) => (
            <div key={index} className={`${containerClassName} invisible`} />
          ))}
        </div>
      )}
      {/* {title === "TOP NFTS" || title === "TOP GROUPS" ? (
        <div className="grid gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className={containerClassName}>
              {renderCard(image)}
            </div>
          ))}
          {fillerArray.map((_, index) => (
            <div key={index} className={`${containerClassName} invisible`} />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className={containerClassName}>
              {renderCard(image)}
            </div>
          ))}
          {fillerArray.map((_, index) => (
            <div key={index} className={`${containerClassName} invisible`} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Section;
