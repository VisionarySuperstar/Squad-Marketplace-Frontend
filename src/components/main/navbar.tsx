"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import useNotificationUIControlStore from "@/store/UI_control/notification";
import { Popover } from "flowbite-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import useLoadingControlStore from "@/store/UI_control/loading";
import toast from "react-hot-toast";

import useUserStore from "@/store/user_infor/userinfor";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Notification from "./News&message/notifications";

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import { useBalance, useAccount, useChainId } from "wagmi";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  return (
    <>
      <div className="fixed left-0 top-0 w-full">
        <div className="flex justify-center">
          <div className="navbar_block">Squad</div>
          <div className="navbar_block">Discover</div>
          <div className="navbar_block">Marketplace</div>
          <div className="navbar_block">Groups</div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
