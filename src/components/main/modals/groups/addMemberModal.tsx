"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";

import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useAuth from "@/hooks/useAuth";
import useAPI from "@/hooks/useAPI";
import { IUSER } from "@/types";

interface AddMemberModalInterface {
  addSelectedUsers: (user: IUSER) => void;
}

const AddMemberModal = ({ addSelectedUsers }: AddMemberModalInterface) => {
  const setAddMemberModalState = useGroupUIControlStore(
    (state) => state.updateAddMemberModal
  );
  const addMemberModalState = useGroupUIControlStore(
    (state) => state.addMemberModal
  );
  const handleAddMember = () => {
    setAddMemberModalState(false);
  };
  const { signIn, isAuthenticated, user } = useAuth();
  const api = useAPI();
  const [allUserData, setAllUserData] = useState<IUSER[]>();
  const [selectedUser, setSelectedUser] = useState<IUSER>({} as IUSER);

  const getAllUserData = async () => {
    const { data: Data } = await api.post(`/auth/user/getAllMembers`);
    console.log("User Data-->", Data);
    setAllUserData(Data);
  }
  useEffect(() => {
    getAllUserData();
  }, []);
  const [name, setName] = useState<string>("");


  return (
    <>
      <div className="">
        <div
          className="join_background"
          onClick={() => {
            setAddMemberModalState(false);
          }}
        ></div>
        <div className="joinModal !w-[500px] drop-shadow-lg mt-5">
          <div
            className="closeBtn"
            onClick={() => {
              setAddMemberModalState(false);
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
          <div className="mt-3 p-3 rounded-lg">
            <h1 className="text-center mt-2 text-chocolate-main text-lg ">
              ADD MEMBER
            </h1>
            <h1 className="text-left text-lg text-chocolate-main mt-2">
              USERNAME
            </h1>
            <div className="flex p-[1px] relative border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
              <input
                className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                type="text"
                placeholder=" E.G. 'Jack'"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setName(event.target.value as string);
                }}
              />
              <div className="absolute bg-black  h-10"></div>
            </div>
            <div className='flex-col gap-3'>
              {
                name && allUserData && allUserData.filter((_user: IUSER) => _user.name.toLowerCase().includes(name.toLowerCase() ) && _user.wallet != user?.wallet).map((_user: IUSER, key) =>
                  <div className={`flex gap-3 items-center mt-3 cursor-pointer hover:bg-indigo-300 p-2 ${selectedUser === _user && 'bg-indigo-300'}`} onClick={() => setSelectedUser(_user)} key={key}>
                    <Image
                      src={_user.avatar}
                      className="rounded-full object-cover"
                      width={50}
                      height={50}
                      alt="avatar"
                    />
                    <h2 className="text-center">{_user.name}</h2>
                  </div>
                )
              }
            </div>
            <div
              className="flex justify-center items-center mt-5 mb-3"
              onClick={() => {
                setAddMemberModalState(false);
              }}
            >
              <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg" onClick={() => addSelectedUsers(selectedUser ? selectedUser:{} as IUSER)}>
                ADD MEMBER
              </button>
          </div>
        </div>
      </div>
    </div >
    </>
  );
};

export default AddMemberModal;
