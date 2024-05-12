/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import useUserStore from "@/store/user_infor/userinfor";
import useWebSocketStore from "@/store/webSocketStore";

import useNotificationUIControlStore from "@/store/UI_control/notification";

const SocketComponent = () => {
  const userid = useUserStore((store) => store.userid);
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
    const _socket = new WebSocket(`ws://localhost:8080`);

    _socket.onopen = () => {
      _socket.send(JSON.stringify({ type: "userId", userId: userid }));
      console.log("connected");
    };

    _socket.onmessage = (message) => {
      updateNewMessageStore(message.data);

      const messageData = JSON.parse(message.data);
      // alert(messageData.message);
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
