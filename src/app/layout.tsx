import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AosProvider from "@/providers/aosProvider";
import Loading_screen from "@/components/main/loading_screen";
import NavBar from "@/components/main/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQUAD",
  description: "SQUAD NFT Marketplace",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AosProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <Loading_screen />
          {children}
        </body>
      </html>
    </AosProvider>
  );
}
