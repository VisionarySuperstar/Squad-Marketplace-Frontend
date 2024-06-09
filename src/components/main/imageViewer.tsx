"use client";

import useLoadingControlStore from "@/store/UI_control/loading";
import React, { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Image from "next/image";
import HeartIcon from "../svgs/heart_icon";
import EyeIcon from "../svgs/eye_icon";

const ImageView: React.FC<{ avatar: string }> = ({ avatar }) => {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
  return (
    <>
      <div className="flex justify-center w-full h-full relative">
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

        {!imageLoaded && (
          <div className="w-full h-full absolute top-0 left-0 z-10 bg-black/50">
            <div className="animated-background"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageView;
