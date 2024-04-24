"use client";

import { useEffect, FC } from "react";
import Aos from "aos";
import "@/assets/dist/aos.css";

interface AosProviderProps {
  children: React.ReactNode;
}

const AosProvider: FC<AosProviderProps> = ({ children }) => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
    });
  }, []);

  return <>{children}</>;
};

export default AosProvider;
