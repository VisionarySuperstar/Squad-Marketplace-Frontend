/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import useUserStore from "@/store/user_infor/userinfor";
import useWebSocketStore from "@/store/webSocketStore";
import useAuth from "@/hooks/useAuth";
import useNotificationUIControlStore from "@/store/UI_control/notification";
import toast from "react-hot-toast";
import Image from "next/image";

const SocketComponent = () => {
  const { user } = useAuth();
  const userid = user?.id;
  const originalSocket = useWebSocketStore((state) => state.socket);
  const setSocket = useWebSocketStore((state) => state.setSocket);
  const close_original_connection = () => {
    originalSocket?.close();
    console.log("original connection closed");
  };
  const updateNewMessageStore = useNotificationUIControlStore(
    (state) => state.updateNewMessage
  );

  const create_new_connection = () => {
    close_original_connection();
    const _socket = new WebSocket(`ws://136.243.172.88:8000/`);

    _socket.onopen = () => {
      _socket.send(JSON.stringify({ type: "userId", userId: userid }));
      console.log("connected");
    };

    _socket.onmessage = (message) => {
      updateNewMessageStore(message.data);
      const messageData = JSON.parse(message.data);

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={messageData.avatar}
                  alt="avatar"
                  width={50}
                  height={50}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {messageData.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {messageData.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      ));
      console.log(messageData);
    };

    _socket.onclose = () => {
      console.log("disconnected");
    };

    setSocket(_socket);
  };

  useEffect(() => {
    create_new_connection();
  }, [userid]);

  return (
    <>
      <div className="hidden"></div>
    </>
  );
};

export default SocketComponent;
