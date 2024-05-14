import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AosProvider from "@/providers/aosProvider";
import Loading_screen from "@/components/main/loading_bar";
import NavBar from "@/components/main/navbar";
import dynamic from "next/dynamic";
import SocketComponent from "@/components/WebSocketComponent";
const Provider = dynamic(() => import("@/providers"), { ssr: false });
import "@rainbow-me/rainbowkit/styles.css";
import DisplayingScreen from "@/components/main/displaying_bar";
// import Web3ContextProvider from "@/providers/web3Provider";

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
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Provider>
            <NavBar />
            <Loading_screen />
            <DisplayingScreen />
            <SocketComponent />
            {children}
          </Provider>
        </body>
      </html>
    </AosProvider>
  );
}
