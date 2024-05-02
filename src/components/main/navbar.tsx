"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import useNotificationUIControlStore from "@/store/UI_control/notification";
import useUserStore from "@/store/user_infor/userinfor";

import Notification from "./News&message/notifications";

const NavBar = () => {
  const isBackbtn = useNavbarUIControlStore((state) => state.isbackbtn);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const current = useNavbarUIControlStore((state) => state.url);
  const isShow = useNavbarUIControlStore((state) => state.isshow);
  const isLogin = useUserStore((store) => store.isLogin);

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
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isShow && (
        <div className="flex justify-between w-[100vw] fixed bg-white top-[0px] h-[100px] border-b items-center p-3 z-[1000] drop-shadow-sm">
          <div className="xs:hidden">
            <div className="min-w-[80px]">
              {isBackbtn && (
                <button
                  className="border-2 border-black rounded-full px-5 h-[30px]"
                  onClick={goBack}
                >
                  Back
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-center w-full z-[10000]">
            <div className="font-Maxeville flex cursor-pointer justify-center">
              <div
                className={`bg-chocolate-main text-white font-bold text-[18px] h-[30px] flex items-center md:pe-[50px] md:ps-[50px] xs:px-[20px] rounded-l-full transition-all
            ${current === "discover" ? "rounded-r-full" : ""}
            ${current === "wallet" ? "xs:rounded-r-full md:rounded-r-none" : ""}
            ${
              current === "logo"
                ? "rounded-r-full pe-[48px] ps-[50px] me-[2px]"
                : "px-[50px]"
            }`}
                onClick={() => {
                  setCurrent("logo");
                  setIsShow(false);
                  router.push("/");
                }}
              >
                SQUAD
              </div>
              <div
                className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:hidden md:block
            ${
              current === "discover"
                ? "rounded-full px-[28px] mx-[2px]"
                : "px-[30px]"
            }
            ${current === "marketplace" ? "rounded-r-full" : ""}
            ${current === "logo" ? "rounded-l-full" : ""}`}
                onClick={() => {
                  setCurrent("discover");
                }}
              >
                Discover
              </div>
              <div
                className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:hidden md:block
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
                  router.push("/marketplace");
                }}
              >
                Marketplace
              </div>
              <div
                className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:hidden md:block
            ${current === "marketplace" ? "rounded-l-full" : ""}
            ${current === "wallet" ? "rounded-r-full" : ""}
            ${
              current === "groups"
                ? "rounded-full px-[28px] mx-[2px]"
                : "px-[30px]"
            }
            `}
                onClick={() => {
                  setCurrent("groups");
                  router.push("/groups");
                }}
              >
                Groups
              </div>
              <div
                className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:px-[10px] md:px-[30px]
            ${current === "logo" ? "md:rounded-none xs:rounded-l-full" : ""}
            ${current === "alert" ? "rounded-r-full px-[30px]" : ""}
            ${current === "groups" ? "md:rounded-l-full xs:rounded-none" : ""}
            ${
              current === "wallet"
                ? "rounded-full px-[28px] mx-[2px]"
                : "px-[30px]"
            }
            `}
                onClick={() => {
                  setCurrent("wallet");
                }}
              >
                0.0266 ETH
              </div>
              <div
                className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center transition-all xs:px-[20px] md:px-[30px]
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
                  <circle cx="15.1682" cy="6.3022" r="5.72725" fill="#FF0000" />
                  <path
                    d="M17.2431 8.1896V8.78076H13.1353V8.29571L15.5757 6.0675C16.1366 5.55213 16.4246 5.29445 16.4246 4.74876C16.4246 4.23339 15.9395 3.83929 15.3332 3.83929C14.3479 3.83929 13.9993 4.63508 13.9993 5.31718H13.3399C13.3399 4.31676 13.9614 3.24813 15.318 3.24813C16.3639 3.24813 17.0915 3.86202 17.0915 4.74876C17.0915 5.58245 16.6216 5.98413 15.9774 6.53739C15.9774 6.53739 14.2721 8.0835 14.1509 8.1896H17.2431Z"
                    fill="white"
                  />
                </svg>
              </div>
              <Notification />
              <div
                className={`bg-chocolate-main text-white text-[18px] h-[30px] flex items-center rounded-r-full transition-all xs:ps-[10px] md:ps-[25px]
            ${current === "alert" ? "rounded-l-full ps-[23px]" : ""}
            ${
              current === "user"
                ? "rounded-l-full ps-[23px] ms-[2px] pe-[5px]"
                : "ps-[25px] pe-[5px]"
            }`}
                onClick={() => {
                  router.push("/profile");
                  setCurrent("user");
                }}
              >
                <svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.895508"
                    width="22"
                    height="22"
                    rx="11"
                    fill="#24FF00"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="xs:hidden">
            <div className="min-w-[150px]">
              <button
                className="border-2 border-black rounded-full px-5 h-[30px]"
                onClick={() => setCreateGroupModalState(true)}
              >
                NEW GROUP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
