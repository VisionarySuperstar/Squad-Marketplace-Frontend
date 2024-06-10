/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useAPI from "@/hooks/useAPI";
import { IGROUP, IUSER, INFT } from "@/types";
import useAuth from "@/hooks/useAuth";

import { IMGBB_API_KEY } from "@/constants/config";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import GROUP_ABI from "@/constants/creator_group.json";
import NFT_ABI from "@/constants/content_nft.json";
import { Icon } from "@iconify/react/dist/iconify.js";
import { uploadToIPFS } from "@/utils/ipfs";
import toast from "react-hot-toast";
import useDisplayingControlStore from "@/store/UI_control/displaying";
import NftCard from "../../cards/nftCard";

interface MintModalInterface {
  groupId: number;
  groupAddress: string;
  collectionAddress: string;
  mintAvatar: string;
  avatarFile: File;
  uploadId: number;
  deleteContent: (id: number) => void;
  getNFTData: () => void;
}
const MintModal = ({
  groupId,
  groupAddress,
  collectionAddress,
  mintAvatar,
  avatarFile,
  deleteContent,
  uploadId,
  getNFTData,
}: MintModalInterface) => {
  const setIsDisplaying = useDisplayingControlStore(
    (state) => state.updateDisplayingState
  );
  const setMainText = useDisplayingControlStore(
    (state) => state.updateMainText
  );

  const [showProgressModal, setShowProgressModal] =
    React.useState<boolean>(false);
  const api = useAPI();

  const setMintModalState = useGroupUIControlStore(
    (state) => state.updateMintModal
  );
  const [selected, setSelected] = React.useState<number>(0);
  const [step, setStep] = React.useState<number>(0);
  const [lastStep, setLastStep] = React.useState<number>(0);
  const [avatar, setAvatar] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = useAuth();
  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  React.useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    const _contract = new Contract(groupAddress, GROUP_ABI, signer);
    setContract(_contract);
  }, [address, chainId, signer, groupAddress]);
  const handleMint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisplaying(true);
    // @step1 upload logo to PINATA
    const _avatar = await uploadToIPFS(
      new File([avatarFile], "metadata.json"),
      ({ loaded, total }: { loaded: number; total: number }) => {
        const value = Math.floor((Number(loaded) * 100) / Number(total));
        console.log("loaded: ", loaded, "total: ", total, "value: ", value);
        setMainText("Uploading content to IPFS: " + value + "%");
      }
    ).catch((err) => {
      console.log(err);
      throw "Project Data upload failed to IPFS. Please retry.";
    });
    console.log("@logoURI: ", _avatar);
    setMainText("Now uploading metadata to IPFS...");
    const _metadata = await uploadToIPFS(
      new File(
        [
          JSON.stringify({
            assetType: "image",
            name: name,
            description: description,
            image: _avatar,
          }),
        ],
        "metadata.json"
      ),
      ({ loaded, total }: { loaded: number; total: number }) => {}
    ).catch((err) => {
      console.log(err);
      throw "Project Data upload failed to IPFS. Please retry.";
    });
    console.log("@logoURI: ", _avatar);
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      //setIsLoading(true);
      setMainText("Waiting for user confirmation...");
      const tx = await contract.mint(_metadata);
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      const _contract = new Contract(collectionAddress, NFT_ABI, signer);
      const collection_id_1 = await _contract.tokenNumber();
      console.log("collection_id: " + collection_id_1);
      const collection_id = Number(Number(collection_id_1) - 1).toString();
      console.log("collection_id", collection_id);
      setMainText("Waiting for backend process...");

      await api
        .post("/api/addNft", {
          name: name,
          description: description,
          collectionAddress: collectionAddress,
          collectionId: collection_id,
          content: _avatar,
          groupId: groupId,
          owner: groupAddress,
        })
        .then(async () => {
          await api
            .post("/api/addMintNumberToGroup", { id: groupId })
            .catch((error) => {
              toast.error(error.message);
            });
        });
      deleteContent(uploadId);
      getNFTData();
      setMintModalState(false);
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
      setIsDisplaying(false);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const close = () => {
    setMintModalState(false);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <div className="flex justify-center items-center z-[1000] w-[100vw] h-[100vh] fixed top-0 left-0">
        <div
          className="bg-black/80 w-[100vw] h-[100vh] fixed top-0 left-0 z-[1000]"
          onClick={() => {
            close();
          }}
        ></div>
        <div className="generalModal w-[565px] z-[1300] drop-shadow-lg">
          <div
            className="closeBtn"
            onClick={() => {
              close();
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
                fill="#000"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-center mt-2 text-black text-lg ">MINT</h1>
            <div className="flex justify-center items-center mt-2">
              <div className="content-card border bg-gray-200 relative w-1/2 ">
                <Image
                  src={mintAvatar}
                  className="w-full h-full aspect-square object-cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="avatar"
                />
              </div>
            </div>
            <form onSubmit={handleMint}>
              <div>
                <h2 className="text-left text-lg text-chocolate-main mt-2">
                  NAME
                </h2>
                <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-full">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                    type="text"
                    placeholder=" E.G. 'Nature'"
                    required
                  />
                </div>
                <h2 className="text-left text-lg text-chocolate-main mt-5">
                  DESCRIPTION
                </h2>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a description..."
                  className="mt-2 outline-none border border-black w-full p-[10px] rounded-xl text-black resize-none"
                  rows={4}
                  required
                />
              </div>

              <div
                className="flex justify-center items-center mt-5 mb-3"
                onClick={() => {
                  () => setMintModalState(false);
                }}
              >
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex items-center justify-center"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <Icon
                        icon="eos-icons:bubble-loading"
                        width={20}
                        height={20}
                      />{" "}
                      PROCESSING...
                    </>
                  ) : (
                    "MINT"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintModal;
