/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import dynamic from "next/dynamic";

const MoonpayModal = () => {
  const setMoonpayModalState = useNavbarUIControlStore(
    (state) => state.updateMoonpayModalState
  );
  const moonpayModalState = useNavbarUIControlStore(
    (state) => state.moonpayModalState
  );
  const MoonPayBuyWidget = dynamic(
    () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
    { ssr: false }
  );
  return (
    <>
      {moonpayModalState && (
        <>
          <div className="flex justify-center items-center z-[1000] w-[100vw] h-[100vh] fixed top-0 left-0">
            <div
              className="bg-black/80 w-[100vw] h-[100vh] fixed top-0 left-0 z-[1000]"
              onClick={() => {
                setMoonpayModalState(false);
              }}
            ></div>
            <div className="generalModal !w-auto drop-shadow-xl z-[1500] justify-center flex !p-0">
              <MoonPayBuyWidget
                variant="embedded"
                baseCurrencyCode="usd"
                baseCurrencyAmount="500"
                defaultCurrencyCode="usdc"
                visible={moonpayModalState}
                className="w-full h-full !border-none !m-0"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MoonpayModal;
