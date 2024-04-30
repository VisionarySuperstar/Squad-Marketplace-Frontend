"use client";

import Image from "next/image";
import MyGroups from "@/data/mygroups.json";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import newgroups from "@/data/newgroups.json";
import AddMemberModal from "@/components/groups/modals/addMemberModal";

const NewGroupModal = () => {
  const setCreateGroupModalState = useGroupUIControlStore(
    (state) => state.updateCreateGroupModal
  );
  const setAddMemberModalState = useGroupUIControlStore(
    (state) => state.updateAddMemberModal
  );
  const addMemberModalState = useGroupUIControlStore(
    (state) => state.addMemberModal
  );
  const seletedGroup = MyGroups[3];

  return (
    <>
      <div className="z-100 font-Maxeville">
        <div
          className="join_background"
          onClick={() => {
            setCreateGroupModalState(false);
          }}
        ></div>
        <div className="joinModal drop-shadow-lg">
          <div
            className="closeBtn"
            onClick={() => {
              setCreateGroupModalState(false);
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
          {addMemberModalState && <AddMemberModal />}
          <div className="ps-[20px] pe-[10px] py-[20px] rounded-lg">
            <h1 className="text-center mt-2 mb-[20px] text-chocolate-main text-lg ">
              CREATE A NEW GROUP
            </h1>
            <div className="max-h-[678px] overflow-auto scrollbar">
              <div className="flex justify-center items-center mt-2">
                <div className="content-card border bg-gray-200 relative w-1/2 ">
                  <Image
                    src={seletedGroup.avatar}
                    className="w-full h-full aspect-square object-cover"
                    width={100}
                    height={100}
                    alt="uploaded content"
                  />
                  <div className="content-card-menu hidden justify-center gap-1 flex-col items-center absolute top-0 w-full h-full bg-chocolate-main/50">
                    <button className="border bg-[#322A44] text-white rounded-full pt-2 pb-2 pl-3 pr-3 w-1/2 text-lg">
                      UPLOAD
                    </button>
                  </div>
                </div>
              </div>
              <h2 className="text-left text-lg text-chocolate-main mt-2">
                GROUP NAME
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                <input
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                  type="text"
                  placeholder=" E.G. 'TOP ARTISTS'"
                />
              </div>
              <h2 className="text-left text-lg text-chocolate-main mt-2">
                GROUP DESCRIPTION
              </h2>
              <textarea
                placeholder="Write a description..."
                className="mt-2 outline-none border-2 border-black w-4/5 p-[10px] rounded-xl text-chocolate-main"
                rows={4}
              />
              <h2 className="text-left text-lg text-chocolate-main mt-2">
                ADD MEMBERS
              </h2>

              <div className="flex flex-wrap gap-3">
                {newgroups.map((index, key) => (
                  <div key={key}>
                    <Image
                      src={index.avatar}
                      className="rounded-full object-cover"
                      width={60}
                      height={60}
                      alt="avatar"
                    />
                    <h2 className="text-center">{index.name}</h2>
                  </div>
                ))}
                <div
                  className="items-center rounded-full object-cover w-[60px] h-[60px] text-lg text-center justify-center flex bg-gray-200"
                  onClick={() => setAddMemberModalState(true)}
                >
                  +
                </div>
              </div>
              <div className="flex justify-center items-center mt-5 mb-3">
                <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg">
                  CREATE GROUP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewGroupModal;
