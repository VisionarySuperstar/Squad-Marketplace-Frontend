"use client";

import useDisplayingControlStore from "@/store/UI_control/displaying";
import React, { useEffect, useRef } from "react";

const LoadingScreen: React.FC = () => {
  const isDisplaying = useDisplayingControlStore((state) => state.displaying);
  const setIsDisplaying = useDisplayingControlStore(
    (state) => state.updateDisplayingState
  );
  useEffect(() => {
    setIsDisplaying(false);
  }, []);
  return (
    <>
      {isDisplaying ? (
        <div className="fixed w-full h-[100vh] top-0 z-[9000] bg-black/20">
          <div className="w-full h-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoadingScreen;
