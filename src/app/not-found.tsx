"use client";
import React, { useEffect } from "react";
import useLoadingControlStore from "@/store/UI_control/loading";

const NotFoundPage = () => {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );

  useEffect(() => {
    setLoadingState(false);
  }, [setLoadingState]);
  return (
    <div
      id="notfound"
      className="h-screen flex items-center justify-center font-Maxeville"
    >
      <div className="max-w-[920px] w-full text-center px-4">
        <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-[-1]">
          <h1 className="text-[180px] font-black text-[#ececec]">404</h1>
        </div>
        <h2 className="text-[46px] font-black text-black uppercase">
          We are sorry, Page not found!
        </h2>
        <p className="text-[16px] font-normal text-black uppercase mt-4">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
