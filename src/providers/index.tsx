"use client";
import React from "react";
import dynamic from "next/dynamic";

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
        <RainbowProvider>
          <ActiveWeb3Provider>
            <AuthProvider>
              <JotaiProvider>
                {children}
              </JotaiProvider>
            </AuthProvider>
          </ActiveWeb3Provider>
        </RainbowProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Provider;
