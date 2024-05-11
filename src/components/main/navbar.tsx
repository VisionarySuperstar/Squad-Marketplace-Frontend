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
  const isGroupBtn = useNavbarUIControlStore((state) => state.isgroupbtn);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const current = useNavbarUIControlStore((state) => state.url);
  const isShow = useNavbarUIControlStore((state) => state.isshow);
  const isLogin = useUserStore((store) => store.isLogin);
  const updateLogin = useUserStore((store) => store.updateIsLogin);
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const setIsGroupBtn = useNavbarUIControlStore(
    (state) => state.updateIsGroupBtn
  );
  const account = useAccount();
  const { data: balance, error } = useBalance(account);
  const [avatar, setAvatar] = useState<string>("");
  const isBackground = useNavbarUIControlStore((state) => state.isbackground);

  const notificationModal = useNotificationUIControlStore(
    (state) => state.notificationModal
  );
  const setIsShow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNotificationState = useNotificationUIControlStore(
    (state) => state.updateNotificationModal
  );
  //zustand Actions
  const setCreateGroupModalState = useGroupUIControlStore(
    (state) => state.updateCreateGroupModal
  );
  const setCurrent = useNavbarUIControlStore((state) => state.updateUrl);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    console.log("test++++++++> ", isLogin)
    // signIn().then((data: any) => {
    //   console.log("here:=========> ", data);
    // })
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const {
    address,
    chain,
    signer,
    isConnected,
    isConnecting,
    isReconnecting,
    connector,
    isDisconnected,
    chainId,
  } = useActiveWeb3();
  const { signIn, isAuthenticated, user } = useAuth();

  const chainID = useChainId();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn();
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      
      if (user) {
        console.log("user", user);
        setAvatar(user.avatar);
        
      }
      updateLogin(true);
    }
    else {
      updateLogin(false);
    }
  }, [isAuthenticated]);
  const _renderSignActions = () => {
    if (!isLogin) {
      return (
        <div
          onClick={_handleSignIn}
          className="flex gap-2 items-center cursor-pointer dark:hover:bg-[#040413] px-3 py-2 hover:bg-[#b6bcc2]"
        >
          {!isLoading ? (
            <Icon
              icon="material-symbols:lab-profile-outline"
              width={20}
              height={20}
            />
          ) : (
            <Icon icon="eos-icons:bubble-loading" width={20} height={20} />
          )}
          SignIn
        </div>
      );
    } else {
      return (
        <div
          onClick={() => router.push("/profile")}
          className="flex gap-2 items-center cursor-pointer dark:hover:bg-[#040413] px-3 py-2 hover:bg-[#b6bcc2]"
        >
          <Icon
            icon="material-symbols:lab-profile-outline"
            width={20}
            height={20}
          />
          Profile
        </div>
      );
    }
  };

  return (
    <>
      {isShow && (

        <>
          <div
            className={`flex justify-between w-[100vw] fixed top-[0px] h-[100px] items-center p-3 drop-shadow-sm z-[150] ${
              isBackground ? " bg-white border-b" : ""
            }`}
          >
            <div className="hidden">
              <div className="min-w-[80px]">
                {
                  <button
                    className="border-2 border-black rounded-full px-5 h-[30px]"
                    onClick={goBack}
                  >
                    Back
                  </button>
                }
              </div>
            </div>
            <div className="flex justify-center w-full z-[10000]">
              <div className="font-Maxeville flex cursor-pointer justify-center">
                <div
                  className={`bg-chocolate-main text-white font-bold text-[18px] h-[30px] flex items-center lg:pe-[50px] lg:ps-[50px] xs:px-[20px] rounded-l-full transition-all hover:bg-chocolate-main/80 active:bg-chocolate-main/90
            ${current === "discover" ? "rounded-r-full" : ""}
            ${current === "wallet" ? "xs:rounded-r-full lg:rounded-r-none" : ""}
            ${
              current === "logo"
                ? "rounded-r-full pe-[48px] ps-[50px] me-[2px]"
                : "px-[50px]"
            }`}
                  onClick={() => {
                    setCurrent("logo");
                    setIsGroupBtn(false);
                    router.push("/");
                  }}
                >
                  SQUAD
                </div>
                <div
                  className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:hidden lg:block hover:bg-chocolate-main/80 active:bg-chocolate-main/90
            ${
              current === "discover"
                ? "rounded-full px-[28px] mx-[2px]"
                : "px-[30px]"
            }
            ${current === "marketplace" ? "rounded-r-full" : ""}
            ${current === "logo" ? "rounded-l-full" : ""}`}
                  onClick={() => {
                    setCurrent("discover");
                    setIsGroupBtn(false);
                    setLoadingState(true);
                  }}
                >
                  Discover
                </div>
                <div
                  className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:hidden lg:block hover:bg-chocolate-main/80 active:bg-chocolate-main/90
            ${current === "discover" ? "rounded-l-full" : ""}
            ${current === "groups" ? "rounded-r-full" : ""}
            ${
              current === "marketplace"
                ? "rounded-full px-[28px] mx-[2px]"
                : "px-[30px]"
            }
            `}
                  onClick={() => {
                    setCurrent("marketplace");
                    if (current !== "marketplace") setLoadingState(true);
                    router.push("/marketplace");
                    setIsGroupBtn(false);
                  }}
                >
                  Marketplace
                </div>
                <div
                  className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:hidden lg:block hover:bg-chocolate-main/80 active:bg-chocolate-main/90
            ${current === "marketplace" ? "rounded-l-full" : ""}
            ${current === "wallet" ? "rounded-r-full" : ""}
            ${
              current === "groups"
                ? "rounded-full px-[28px] mx-[2px]"
                : "px-[30px]"
            }

            `}
                  onClick={() => {
                    if (current !== "groups") setLoadingState(true);
                    router.push("/groups");
                    setIsGroupBtn(true);
                  }}
                >
                  Groups
                </div>
                {!openConnectModal && openChainModal && (
                  <>
                    <div
                      className={`relative bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:px-[10px] lg:px-[30px] 
                      ${
                        current === "logo"
                          ? "lg:rounded-none xs:rounded-l-full"
                          : ""
                      }
                      ${
                        current === "alert"
                          ? "rounded-r-full px-[30px] hover:after:rounded-r-full"
                          : ""
                      }
                      ${
                        current === "groups"
                          ? "lg:rounded-l-full xs:rounded-none"
                          : ""
                      }
                      ${
                        current === "connectWallet"
                          ? "lg:rounded-l-full xs:rounded-none"
                          : ""
                      }
                      ${
                        current === "wallet"
                          ? "rounded-full px-[28px] mx-[2px]"
                          : "px-[30px]"
                      }
                       ${
                         chainID === 11155111 &&
                         "hover:after:content-['Sepolia']"
                       }
                       ${chainID === 1 && "hover:after:content-['Mainnet']"}
                       ${chainID === 137 && "hover:after:content-['Polygon']"}
                       hover:after:absolute
                       hover:after:w-full
                       hover:after:h-full
                       hover:after:bg-chocolate-main
                    `}
                      onClick={() => {
                        openChainModal();
                      }}
                    >
                      <div>
                        {Number(balance?.formatted).toFixed(3)}{" "}
                        <span className="hidden lg:inline">
                          {balance?.symbol}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`${
                        user && "rounded-r-full"
                      } bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:px-[20px] lg:px-[30px]
                ${current === "user" ? "rounded-r-full" : ""}
                ${current === "wallet" ? "rounded-l-full" : ""}
                ${
                  current === "alert"
                    ? "rounded-full px-[28px] mx-[2px]"
                    : "px-[30px]"
                }
            `}
                      onClick={() => {
                        setCurrent("alert");
                        setNotificationState(!notificationModal);
                      }}
                    >
                      <svg
                        width="21"
                        height="22"
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.98813 9.84313C1.98813 7.61616 4.11003 5.76628 6.79968 5.72559H6.88845C9.5781 5.76628 11.7 7.61616 11.7 9.84313V16.5484H13.7V19.072H8.43786L8.54768 19.2896C8.64544 19.4832 8.7 19.6995 8.7 19.9278C8.7 20.7462 7.99235 21.4249 7.1 21.4249C6.20765 21.4249 5.5 20.7462 5.5 19.9278C5.5 19.6995 5.55456 19.4832 5.65232 19.2896L5.76214 19.072H0V16.5484H1.98813V9.84313ZM6.84546 8.11466L6.84267 8.11469C6.07047 8.12185 5.44959 8.30681 5.02021 8.68323C4.58733 9.06271 4.37128 9.61714 4.37128 10.3137V16.5484H9.31685V10.3137C9.31685 9.61714 9.10079 9.06271 8.66792 8.68323C8.23854 8.30681 7.61766 8.12185 6.84546 8.11466Z"
                          fill="white"
                        />
                        <circle
                          cx="15.1682"
                          cy="6.3022"
                          r="5.72725"
                          fill="#FF0000"
                        />
                        <path
                          d="M17.2431 8.1896V8.78076H13.1353V8.29571L15.5757 6.0675C16.1366 5.55213 16.4246 5.29445 16.4246 4.74876C16.4246 4.23339 15.9395 3.83929 15.3332 3.83929C14.3479 3.83929 13.9993 4.63508 13.9993 5.31718H13.3399C13.3399 4.31676 13.9614 3.24813 15.318 3.24813C16.3639 3.24813 17.0915 3.86202 17.0915 4.74876C17.0915 5.58245 16.6216 5.98413 15.9774 6.53739C15.9774 6.53739 14.2721 8.0835 14.1509 8.1896H17.2431Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <Notification />
                    <Popover
                      content={
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                          {_renderSignActions()}
                          <div
                            onClick={openAccountModal}
                            className="flex gap-2 rounded-b-lg items-center cursor-pointer dark:hover:bg-[#040413] px-3 py-2 hover:bg-[#b6bcc2]"
                          >
                            <Icon icon="tabler:logout" width={20} height={20} />
                            Disconnect
                          </div>
                        </div>
                      }
                      arrow={false}
                      trigger="hover"
                    >
                      <div
                        className={`${
                          user && "bg-white"
                        } bg-chocolate-main text-white text-[18px] h-[30px] flex items-center rounded-r-full transition-all 
                      ${current === "alert" ? "rounded-l-full " : ""}
                      ${
                        current === "user"
                          ? "rounded-l-full ms-[2px] ps-[20px] pe-[20px]"
                          : "ps-[20px] pe-[20px]"
                      }`}
                        onClick={() => {
                          setCurrent("user");
                        }}
                      >
                        <div className="flex flex-none justify-center items-center p-2">
                          {user && user.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <Image
                              src={avatar}
                              key={avatar}
                              width={36}
                              height={36}
                              alt={"wallet avatar"}
                              // priority={true}
                              className="rounded-full aspect-square"
                            />
                          ) : (
                            <Icon
                              icon="flowbite:user-solid"
                              width={36}
                              height={36}
                              className="rounded-full bg-[#46455367] dark:text-black dark:bg-[#868592c4] opacity-50"
                            />
                          )}
                        </div>
                      </div>
                    </Popover>
                  </>
                )}
                {openConnectModal && (
                  <div
                    className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all rounded-r-full hover:bg-chocolate-main/80 active:bg-chocolate-main/90
                
                  ${current === "groups" ? "rounded-l-full" : ""}
                  ${
                    current === "connectWallet"
                      ? "rounded-full px-[28px] mx-[2px]"
                      : "px-[30px]"
                  }
                  `}
                    onClick={() => {
                      openConnectModal();
                    }}
                  >
                    Connect Wallet
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
          <div
            className={`${
              isGroupBtn ? "" : "hidden"
            } z-[1000] fixed right-0 top-[35px]`}
          >
            <div className="min-w-[150px]">
              <button
                className="border-2 border-black rounded-full px-5 h-[30px]"
                onClick={() => setCreateGroupModalState(true)}
              >
                NEW GROUP
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
