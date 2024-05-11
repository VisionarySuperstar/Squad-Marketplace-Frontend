"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import MyGroups from "@/data/mygroups.json";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import newgroups from "@/data/newgroups.json";
import { IUSER } from "@/types";
import AddMemberModal from "@/components/main/modals/groups/addMemberModal";
import useToastr from "@/hooks/useToastr";
import useAuth from "@/hooks/useAuth";
import useAPI from "@/hooks/useAPI";
import { IMGBB_API_KEY } from "@/constants/config";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import FACTORY_ABI from "@/constants/factory.json";
import { Factory_ADDRESSES } from "@/constants/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

import useCreatGroupState from "@/store/createGroupStatus";

const acceptables = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

const NewGroupModal = () => {
  const router = useRouter();

  const setCreateGroupModalState = useGroupUIControlStore(
    (state) => state.updateCreateGroupModal
  );
  const setAddMemberModalState = useGroupUIControlStore(
    (state) => state.updateAddMemberModal
  );
  const addMemberModalState = useGroupUIControlStore(
    (state) => state.addMemberModal
  );
  const updateCreateGroupState = useCreatGroupState(
    (state) => state.updateState
  );
  const { signIn, isAuthenticated, user } = useAuth();
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [preview, setPreview] = React.useState<string>("");
  const { showToast } = useToastr();
  const [selectedUsers, setSelectedUsers] = React.useState<IUSER[]>(
    user ? [user] : []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const [groupName, setGroupName] = React.useState<string>("");
  const [groupDescription, setGroupDescription] = React.useState<string>("");
  const [groupConfirmNumber, setGroupConfirmNumber] =
    React.useState<string>("");
  const api = useAPI();
  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );
  React.useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    const _contract = new Contract(
      Factory_ADDRESSES[chainId],
      FACTORY_ABI,
      signer
    );
    setContract(_contract);
  }, [address, chainId, signer]);

  useEffect(() => {
    setPreview("/assets/images/preview.png");
  }, []);

  const addSelectedUsers = (_user: IUSER) => {
    if (_user !== ({} as IUSER)) setSelectedUsers([...selectedUsers, _user]);
  };

  const _submitRegister = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const memberAddresses = selectedUsers.map((item: IUSER) => item.wallet);
      const tx = await contract.createGroup(
        groupName,
        groupDescription,
        memberAddresses,
        Number(groupConfirmNumber)
      );
      await tx.wait();
      const numberOfCreators = await contract.numberOfCreators();
      const _group_Address = await contract.getCreatorGroupAddress(
        Number(numberOfCreators) - 1
      );

      let _avatar = "";
      if (avatar) {
        const formData = new FormData();
        formData.append("image", avatar);
        const {
          data: { url: _newAvatar },
        } = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        _avatar = _newAvatar;
      }
      console.log("avatar..........", _avatar);

      const memberData = selectedUsers.map((item: IUSER) => ({ id: item.id }));
      console.log("memberData", JSON.stringify(memberData));
      const { data: res } = await api.post("/api/addGroup", {
        id: user.id,
        name: groupName,
        avatar: _avatar,
        director: user.id,
        requiredConfirmNumber: groupConfirmNumber,
        member: JSON.stringify(memberData),
        description: groupDescription,
        address: _group_Address,
      });
      console.log("adding group arrived!!!");
      if (res === "Success") {
        setAvatar(avatar);
        showToast("Successfully New Group Created.", "success");
        updateCreateGroupState("just_created");
        setCreateGroupModalState(false);
        router.push(`/groups`);
      } else {
        showToast("Group Creating Failed.", "warning");
      }
    } catch (err: any) {
      if (String(err.code) === "ACTION_REJECTED") {
        showToast("User rejected transaction.", "warning");
      } else {
        showToast(String(err), "warning");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isLoading) return;

    setIsInvalid(true);

    let valid = true;

    if (!groupName) {
      showToast("Input your Group Name", "warning");
      valid = false;
    }
    if (!groupDescription) {
      showToast("Input your Group Description", "warning");
      valid = false;
    }
    if (!selectedUsers.length) {
      showToast("Select at least one member", "warning");
      valid = false;
    }

    if (valid) {
      if (!isAuthenticated) {
        showToast("Connect your wallet!", "warning");
      } else {
        _submitRegister();
      }
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) throw "no files";
      const file: File = event.target.files[0];
      if (!file) throw "Emptry file";
      if (!acceptables.includes(file.type)) throw "Invalid Image file.";
      if (file.size > 32 * 1024 * 1024)
        throw "Overflow maximum file size (32MB).";
      setAvatar(file);
      const reader = new window.FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const _file: string = String(reader.result);
        setPreview(_file);
      };
    } catch (err) {
      showToast("Image upload failed. please try again.", "warning");
      setPreview("/assets/images/preview.png");
    }
  };

  return (
    <>
      <div className="z-100 font-Maxeville">
        <div
          className="bg-chocolate-main/50 w-[100vw] h-[100vh] fixed top-0 z-[1000]"
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
          {addMemberModalState && (
            <AddMemberModal addSelectedUsers={addSelectedUsers} />
          )}
          <div className="ps-[20px] pe-[10px] py-[20px] rounded-lg">
            <h1 className="text-center mt-2 mb-[20px] text-chocolate-main text-lg ">
              CREATE A NEW GROUP
            </h1>
            <div className="max-h-[678px] overflow-auto scrollbar">
              <div className="flex justify-center items-center mt-2">
                <div className="border bg-gray-200 relative w-1/2 ">
                  <Image
                    src={preview}
                    className="w-full h-full aspect-square object-cover"
                    width={300}
                    height={300}
                    alt=""
                  />
                  <div className="absolute top-0 w-full h-full">
                    <label htmlFor="avatar" className="w-full h-full ">
                      <div className=" text-chocolate-main pt-2 pb-2 pl-3 pr-3 w-full text-lg text-center cursor-pointer h-full flex items-center justify-center">
                        Upload group image
                        <br /> +
                      </div>
                      <input
                        hidden
                        id="avatar"
                        type="file"
                        onChange={onFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <h2 className="text-left text-lg text-chocolate-main my-3">
                GROUP NAME
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-chocolate-main/50 h-[30px] mt-2 w-1/2">
                <input
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder=" E.G. 'TOP ARTISTS'"
                />
              </div>
              <h2 className="text-left text-lg text-chocolate-main my-3">
                GROUP DESCRIPTION
              </h2>
              <textarea
                placeholder="Write a description..."
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="mt-2 outline-none border border-chocolate-main/50 w-4/5 p-[10px] rounded-xl text-chocolate-main resize-none"
                rows={4}
              />
              <h2 className="text-left text-lg text-chocolate-main my-3">
                ADD MEMBERS
              </h2>

              <div className="flex flex-wrap gap-3">
                {selectedUsers.map((index, key) => (
                  <div key={key}>
                    <Image
                      src={index.avatar}
                      className="rounded-full object-cover"
                      width={60}
                      height={60}
                      alt="avatar"
                    />
                    <h2 className="text-center">
                      {index.name === user?.name ? "You" : index.name}
                    </h2>
                  </div>
                ))}
                <div
                  className=" cursor-pointer items-center rounded-full object-cover w-[60px] h-[60px] text-lg text-center justify-center flex bg-gray-200"
                  onClick={() => setAddMemberModalState(true)}
                >
                  +
                </div>
              </div>
              <h2 className="text-left text-lg text-chocolate-main my-3">
                REQUIRED CONFIRMATION #
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-chocolate-main/50  h-[30px] mt-2 w-1/2">
                <input
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                  type="text"
                  value={groupConfirmNumber}
                  onChange={(e) => setGroupConfirmNumber(e.target.value)}
                  placeholder="1,2,3..."
                />
              </div>
              <div className="flex justify-center items-center mt-5 mb-3">
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg flex items-center justify-center text-center"
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <>
                      <Icon
                        icon="eos-icons:bubble-loading"
                        width={20}
                        height={20}
                      />
                      PROCESSING...
                    </>
                  ) : (
                    "CREATE GROUP"
                  )}
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
