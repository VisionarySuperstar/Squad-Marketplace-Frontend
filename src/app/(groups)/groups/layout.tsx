"use client";

import React from "react";

import Footer from "@/components/main/footer/footer";
export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
