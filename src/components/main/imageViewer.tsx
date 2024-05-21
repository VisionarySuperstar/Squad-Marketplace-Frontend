"use client";

import useLoadingControlStore from "@/store/UI_control/loading";
import React, { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";

const ImageView: React.FC<{ avatar: string }> = ({ avatar }) => {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
  return (
    <>
      <div className="flex justify-center">
        <div>
          <PhotoProvider bannerVisible={false}>
            <PhotoView src={avatar}>
              <Image
                src={avatar}
                className="md:h-[70vh] object-contain w-auto"
                alt="group_avatar"
                width={706}
                height={706}
                onLoad={() => setImageLoaded(true)}
              />
            </PhotoView>
          </PhotoProvider>
        </div>

        {/* {!imageLoaded && (

        )} */}
        {/* <div className="w-full h-full absolute top-0 left-0 bg-white">
          <div className="animated-background"></div>
        </div> */}
      </div>
    </>
  );
};

export default ImageView;
