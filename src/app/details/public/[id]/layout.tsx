"use client";

import React from "react";

import Footer from "@/components/main/footer/footer";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";
export default function Home({ children }: { children: React.ReactNode }) {
  useEndLoadingState();
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
