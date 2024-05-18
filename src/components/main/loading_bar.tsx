"use client";

import useLoadingControlStore from "@/store/UI_control/loading";
import React, { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

interface LoadingBarRef {
  continuousStart: () => void;
  staticStart: () => void;
  complete: () => void;
}

const LoadingScreen: React.FC = () => {
  const ref = useRef<LoadingBarRef | null>(null); // Specify the type of ref

  const isLoading = useLoadingControlStore((state) => state.loading);
  useEffect(() => {
    if (isLoading) {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [isLoading]);

  return (
    <>
      <div className="fixed w-full h-[2px] top-0 z-[9000] bg-transparent loadingbar">
        <div>
          <LoadingBar color="#322a44" height={3} ref={ref} />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
