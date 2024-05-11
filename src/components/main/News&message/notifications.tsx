"use client";

import React from "react";
import useNotificationUIControlStore from "@/store/UI_control/notification";
import NotificationData from "@/data/notifications.json";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Notification: React.FC = () => {
  const setNotificationState = useNotificationUIControlStore(
    (state) => state.updateNotificationModal
  );
  const notificationModal = useNotificationUIControlStore(
    (state) => state.notificationModal
  );
  const router = useRouter();

  return (
    <>
      {notificationModal && (
        <div className=" cursor-default">
          <div
            className="fixed bg-transparent w-[100vw] h-[100vh] top-0 left-0"
            onClick={() => {
              setNotificationState(false);
            }}
          ></div>
          <div className=" text-chocolate-main">
            <div className="fixed top-[80px] z-20 !w-[360px] ml-[-360px] xs:right-0 md:rounded-none md:left-auto md:right-auto border drop-shadow-xl bg-white">
              <div className="z-20">
                <div className="flex justify-between p-5">
                  <div className="">
                    <h1 className="text-center text-[#322A44] text-[18px]">
                      NOTIFICATIONS
                    </h1>
                  </div>
                  <div
                    className="closeBtn"
                    onClick={() => {
                      setNotificationState(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z"
                        fill="#322A44"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-lg text-[12px]">
                  <h1 className="text-[#FF0000] ">NEW</h1>
                  <h1 className="text-[#322A44] mt-3 border-b-2 pb-2">
                    MESSAGES(10)
                  </h1>
                  <div>
                    {NotificationData.map((index, key) => (
                      <div
                        key={key}
                        className="flex items-center mt-5 gap-3 border-b-2 pb-3"
                      >
                        <div className="h-[30px]">
                          <Image
                            src={index.avatar}
                            className="h-full w-full aspect-square rounded-full"
                            width={100}
                            height={100}
                            alt="avatar"
                          />
                        </div>

                        <div className="flex gap-3">
                          <div>NEW SALE</div>
                          <div className="text-gray-400">IN</div>
                          <div>{index.name} </div>
                          <div className="text-gray-400">{index.lastSeen}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="text-gray-400 text-center mt-3 underline"
                    onClick={() => {
                      router.push(`/message`);
                    }}
                  >
                    VIEW MESSAGES
                  </div>
                  <h1 className="text-[#322A44] mt-3 border-b-2 pb-2">
                    ACTIVITY(10)
                  </h1>
                  <div>
                    {NotificationData.map((index, key) => (
                      <div
                        key={key}
                        className="flex items-center mt-5 gap-3 border-b-2 pb-3"
                      >
                        <div className="h-[30px]">
                          <Image
                            src={index.avatar}
                            className="h-full w-full aspect-square rounded-full"
                            width={100}
                            height={100}
                            alt="avatar"
                          />
                        </div>

                        <div className="flex gap-3">
                          <div>NEW SALE</div>
                          <div className="text-gray-400">IN</div>
                          <div>{index.name} </div>
                          <div className="text-gray-400">{index.lastSeen}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-400 text-center mt-3 underline">
                    VIEW ACTIVITY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
