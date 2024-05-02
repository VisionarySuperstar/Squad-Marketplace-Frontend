"use client";

import { useEffect, FC } from "react";
import useLoadingControlStore from "@/store/UI_control/loading";

interface AosProviderProps {
  children: React.ReactNode;
}

const LoadingProvider: FC<AosProviderProps> = ({ children }) => {
  const isLoading = useLoadingControlStore((state) => state.loading);
  useEffect(() => {
    if (isLoading) document.body.style.overflow = "auto";
  }, [isLoading]);
  return <>{children}</>;
};

export default LoadingProvider;
