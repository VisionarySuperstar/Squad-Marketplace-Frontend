"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import SearchIcon from "@/components/svgs/search_icon";
import WriteIcon from "@/components/svgs/write_icon";
import ChatMessageData from "@/data/chat_group.json";
import data from "@/data/groups.json";
import Image from "next/image";
import SeenIcon from "@/components/svgs/seen_icon";
import ChatLinkIcon from "@/components/svgs/chatlink_icon";
//import Store
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import useWebSocketStore from "@/store/webSocketStore";
import useUserStore from "@/store/user_infor/userinfor";
import useNotificationUIControlStore from "@/store/UI_control/notification";
import useAuth from "@/hooks/useAuth";

import Message from "@/interfaces/message";

export default function MessagePage() {
  const { user } = useAuth();

  //data
  const JoinedGroups = data.filter((group) =>
    group.members.some((member) => member.id === "190635")
  );
  //useState
  const [content, setContent] = useState<string>("");
  const [inputid, setinputid] = useState<string>("");
  const [groupid, setGroupId] = useState<string>("");
  const [selectedGroupListId, setSelectedGroupListId] = useState<number>(-1);
  const [selectedUserListId, setSelectedUserListId] = useState<number>(-1);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [messageData, setMessageData] = useState<Message[]>();
  const [sotedMessageData, setSotedMessageData] = useState<Message[]>();
  const [messageType, setMessageType] = useState<string>("");
  //useRef
  const messageInputRef = useRef<HTMLDivElement>(null);
  const clearMessageInput = () => {
    if (messageInputRef.current) {
      messageInputRef.current.textContent = "";
    }
  };
  //zustand State
  const userid = useUserStore((state) => state.userid);
  const setUseridStore = useUserStore((state) => state.updateUserId);
  const setUserId = (id: string) => {
    setUseridStore(id);
    window.localStorage.setItem("userid", id);
  };
  const socket = useWebSocketStore((state) => state.socket);
  const newMessageStore = useNotificationUIControlStore(
    (state) => state.newMessage
  );
  const updateNewMessageStore = useNotificationUIControlStore(
    (state) => state.updateNewMessage
  );
  const updateNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  //handler
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputid(event.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (e.ctrlKey) {
        e.preventDefault();
        setContent((prevcontent) => prevcontent + "\n");
        document.execCommand("insertLineBreak");
      } else {
        e.preventDefault();
        if (content != "") saveMessageData(messageType, groupid, content);
        clearMessageInput();
      }
    }
  };
  const handleGroupListItemClicked = async (index: number, groupid: string) => {
    setSelectedGroupListId(index);
    await setMessageType("group");
    await setGroupId(groupid);
    await fetchMessageData("group", groupid);
  };

  const fetchMessageData = async (type: string, receiverId: string) => {
    const init = { type: type, receiverId: receiverId };
    try {
      const response = await fetch("http://localhost:8080/api/getMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(init),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      await response.json().then((data) => {
        setMessageData(data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addNewMessage = (receiverId: string, from: string, message: string) => {
    if (receiverId === groupid) {
      const newMessage: Message = {
        id: 0,
        from: from,
        to: receiverId,
        type: "group",
        time: "2022-01-01 12:00:00",
        status: "unread",
        message: message,
      };
      sotedMessageData?.unshift(newMessage);
    } else alert(`New Message received on group ${receiverId}`);
  };
  const saveMessageData = async (
    type: string,
    receiverId: string,
    message: string
  ) => {
    const init = {
      type: type,
      senderId: userid,
      receiverId: groupid,
      message: message,
    };
    addNewMessage(receiverId, userid ? userid : "0", message);
    try {
      const response = await fetch("http://localhost:8080/api/saveMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(init),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      await response.json().then((data) => {
        console.log(data.message);
        setContent("");
        clearMessageInput();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //useEffect
  useEffect(() => {
    setLoadingState(false);
    updateNavbarBackground(true);
  }, [setLoadingState, updateNavbarBackground]);

  useEffect(() => {
    setSelectedGroup(JoinedGroups.find((group) => group.id == groupid));
  }, [JoinedGroups, groupid]);

  useEffect(() => {
    setSotedMessageData(messageData?.sort((a, b) => b.id - a.id));
  }, [messageData]);

  useEffect(() => {
    if (newMessageStore !== "") {
      const newMessageStoreData = JSON.parse(newMessageStore);
      addNewMessage(
        newMessageStoreData?.to,
        newMessageStoreData?.from, // Access 'from' directly without optional chaining
        newMessageStoreData?.message
      );
      updateNewMessageStore("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessageStore]);

  return (
    <>
      <div className="fixed p-5 border flex-col bg-white min-h-[200px] drop-shadow-sm top-[110px] right-5 z-10">
        <p>UserId:{userid}</p>
        <p>GroupId:{groupid}</p>

        <div>
          <input
            type="text"
            className="border-2 my-5 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded active:translate-y-1"
          onClick={() => {
            setUserId(inputid);
          }}
        >
          Set UserID
        </button>
      </div>
      <div>
        <div
          className="page_container_p40 pt-[100px] w-full h-[100vh] flex font-Maxeville"
          style={{
            backgroundImage: "url('/assets/images/backgrounds/message.jpg')",
            backgroundSize: "auto 100vh",
          }}
        >
          <div className="flex-col hidden md:flex md:w-1/2 lg:w-1/3 xl:1/4 2xl:w-1/5 pb-[15px] ">
            <div className="pe-[20px]">
              <div className="bg-white py-3 border-b-[1px]">
                <div className="flex justify-between min-h-[50px] items-center ">
                  <div className="text-[18px] text-[#322A44]">INBOX</div>
                  <div className="flex gap-2">
                    <div className="rounded-md p-[5px] hover:bg-gray-100 transition-all active:translate-y-[2px]">
                      <SearchIcon props="#322A44" />
                    </div>
                    <div className="rounded-md p-[5px] hover:bg-gray-100 transition-all active:translate-y-1">
                      <WriteIcon props="#322A44" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* list */}
            <div className="overflow-y-scroll scrollbar pe-3">
              <div className="text-gray-400 text-[12px] my-3 overflow-hidden text-overflow">
                <p className="truncate">Groups</p>
              </div>
              {JoinedGroups.map((item, index) => (
                <div key={index}>
                  <div
                    className={`flex flex-col gap-1 border-b-[1px] cursor-pointer transition-all ${
                      selectedGroupListId === index &&
                      !selectedUserListId &&
                      "bg-chocolate-main/10"
                    } hover:bg-chocolate-main/5 p-3 `}
                    onClick={() => {
                      handleGroupListItemClicked(index, item.id);
                      setSelectedUserListId(0);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-1/4 rounded-full">
                        <Image
                          src={item.avatar}
                          className="w-[50px] h-[50px] rounded-full object-cover aspect-square"
                          width={100}
                          height={100}
                          alt="avatar"
                        />
                      </div>
                      <div className="w-3/4 flex justify-between items-center">
                        <div className="flex flex-col w-[140px] 2xl:w-[150px] xl:w-[160px]">
                          <div className="text-[18px] overflow-hidden text-overflow">
                            <p className="truncate">{item.name}</p>
                          </div>
                          <div className="text-gray-400 text-[12px] overflow-hidden text-overflow">
                            <p className="truncate">Hello, How are...</p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          {/* <div className="text-gray-400 text-right">
                            {index.lastSeen}
                          </div> */}
                          <div className="mt-2 flex  justify-end">
                            <SeenIcon props="#322A44" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full w-[2px] bg-chocolate-main/10 me-[20px] xs:hidden md:block"></div>
          {/* Messages */}
          <div className="flex flex-col w-full md:w-4/5 justify-between">
            {selectedGroupListId === -1 && selectedUserListId === -1 ? null : (
              <>
                <div className="flex gap-5 p-3 border-b">
                  {/* Group Avatar */}
                  <div>
                    <Image
                      src={selectedGroup?.avatar}
                      className="w-[50px] h-[50px] rounded-full object-cover aspect-square"
                      width={100}
                      height={100}
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[18px]">{selectedGroup?.name}</div>
                    <div className="text-gray-400 text-[12px]">
                      {
                        ChatMessageData[selectedGroupListId]?.members[
                          selectedUserListId
                        ].lastSeen
                      }
                    </div>
                  </div>
                </div>
                <div className="overflow-y-scroll scrollbar h-full flex flex-col-reverse">
                  {sotedMessageData?.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className={`flex gap-5 p-3 ${
                          item.from === userid && "flex-row-reverse"
                        }`}
                      >
                        <div className="w-[50px] flex items-end">
                          <Image
                            src={"/assets/images/users/user2.jpg"}
                            className="w-[50px] h-[50px] rounded-full object-cover aspect-square"
                            width={100}
                            height={100}
                            alt="avatar"
                          />
                        </div>
                        <div className="flex flex-col lg:max-w-[60%] bg-white/50 border drop-shadow-sm p-5 rounded-md">
                          <div className="text-[15px] break-all">
                            {item.message.split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                          <div className="text-gray-400 text-[12px] mt-[10px]">
                            {item.time}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                <div className="flex p-3">
                  <div className="bottom-[30px] w-full">
                    {content === "" && (
                      <div className="absolute text-[#999] pointer-events-none m-3">
                        Enter your text here...
                      </div>
                    )}
                    <div
                      id="message_input"
                      style={{ whiteSpace: "pre" }}
                      ref={messageInputRef}
                      contentEditable={true}
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                      }}
                      onInput={(e) => {
                        setContent(e.currentTarget.textContent || "");
                      }}
                      className="w-full p-3 whitespace-pre-wrap rounded-lg bg-transparent border-[1px] border-[#322A44] focus:outline-none resize-none min-h-[90px] scrollbar line-height-1 max-h-[200px] overflow-y-auto"
                    ></div>
                    <div className="flex justify-between mt-3">
                      <div className="justify-center flex items-center h-full mt-3">
                        <ChatLinkIcon props="#322A44" />
                      </div>
                      <div className="justify-center flex items-center h-full">
                        <button
                          className=" rounded-full p-2 text-white bg-[#322A44] w-[119px]"
                          onClick={() => {
                            if (content != "")
                              saveMessageData(messageType, groupid, content);
                          }}
                        >
                          SEND
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
