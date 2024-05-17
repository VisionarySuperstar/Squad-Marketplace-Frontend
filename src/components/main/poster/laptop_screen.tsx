import Logo from "../logo/logo";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoadingControlStore from "@/store/UI_control/loading";

const Laptop = () => {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const router = useRouter();
  return (
    <>
      <div className="laptop_screen">
        <div className="laptop_join_btn">
          <div
            className="join_btn"
            onClick={() => {
              router.push("/discover");
              setLoadingState(true);
            }}
          >
            <p className="tracking-[1px] font-bold">Open App</p>
          </div>
        </div>
        <div className="header w-full lg:mt-[30px] md:mt-[30px] sm:mt-[10px] z-[200]">
          <div className="text-center mx-[30px] tracking-[1px] drop-shadow-xl">
            <p className="heading_text">
              Finally, the digital market is arriving to fashion creatives.
              Prepare with your team (SQUAD)
            </p>
          </div>
        </div>
        <div
          id="canvas"
          className="w-full 1200:col-span-12 1200:col-start-2 aspect-video relative bg-black rounded-[0px] 1000:rounded-[40px] overflow-hidden"
        >
          <video autoPlay muted loop playsInline width="100%" preload="auto">
            <source src="/assets/video/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex justify-center z-100">
            <Logo />
            <div className="flex justify-center laptop_discover"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Laptop;
