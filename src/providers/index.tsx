"use client";
import React from "react";
import dynamic from "next/dynamic";
import { MoonPayProvider } from "@moonpay/moonpay-react";


const JotaiProvider = dynamic(() => import("@/providers/jotaiProvider"), { ssr: false });
const RainbowProvider = dynamic(() => import("@/providers/rainbowProvider"), { ssr: false });
const ToastProvider = dynamic(() => import("@/providers/toastProvider"), { ssr: false });
const AuthProvider = dynamic(() => import("@/providers/authProvider"), { ssr: false });
const ActiveWeb3Provider = dynamic(() => import("@/providers/web3Provider"), { ssr: false });
import { ThemeProvider } from "styled-components";
import theme from "@/constants/theme";


const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
      <MoonPayProvider apiKey="pk_test_4DFSiqXHV0Dp6xP1y1fvkFFZ6R4wIiGT" debug>
        <RainbowProvider>
          <ActiveWeb3Provider>
            <AuthProvider>
              <JotaiProvider>
                {children}
              </JotaiProvider>
            </AuthProvider>
          </ActiveWeb3Provider>
        </RainbowProvider>
        </MoonPayProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Provider;
