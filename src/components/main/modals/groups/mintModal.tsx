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
<<<<<<< HEAD
  const getNftById = async (id: string) => {
    console.log("id ", id);
    const result = await api
      .post(`/api/getNftById`, { id: id })
      .catch((error) => {
        toast.error(error.message);
      });
    console.log("url", result?.data);
    return result?.data;
  };
=======
>>>>>>> 0b578aadd946aebdd123791683e1e0accd3a92ab
  const handleMint = async () => {
    setIsLoading(true);
    setIsDisplaying(true);
    // @step1 upload logo to PINATA
    const _avatar = await uploadToIPFS(
      new File([avatarFile], "metadata.json"),
      ({ loaded, total }: { loaded: number; total: number }) => {
        const value = Math.floor((Number(loaded) * 100) / Number(total));
        console.log("loaded: ", loaded, "total: ", total, "value: ", value);
        setMainText("Uploading content to IPFS... " + value + "%");
      }
    ).catch((err) => {
      console.log(err);
      throw "Project Data upload failed to IPFS. Please retry.";
    });
    console.log("@logoURI: ", _avatar);
<<<<<<< HEAD
    setStepper(2);
    setMainText("Now uploading metadata to IPFS...");
    const _metadata = await uploadToIPFS(
      new File(
        [
          JSON.stringify({
            assetType: "image",
            image: _avatar,
          }),
        ],
        "metadata.json"
      ),
=======
    setMainText("Now uploading metadata to IPFS...");
    const _metadata = await uploadToIPFS(
      new File([
        JSON.stringify({
          assetType: "image",
          name: name,
          description: description,
          image: _avatar,
        })
      ], "metadata.json"),  
>>>>>>> 0b578aadd946aebdd123791683e1e0accd3a92ab
      ({ loaded, total }: { loaded: number; total: number }) => {
      }
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
          name:name,
          description:description,
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
  return (
    <>
      <div className="z-100 font-Maxeville text-black-main">
        <div
          className="bg-black/35 w-[100vw] h-[100vh] fixed top-0 z-[1000]"
          onClick={() => {
            setMintModalState(false);
          }}
        ></div>
        <div className="generalModal w-[565px] z-[1300] drop-shadow-lg p-[25px]">
          <div
            className="closeBtn"
            onClick={() => {
              setMintModalState(false);
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
<<<<<<< HEAD

          {!step && (
            <div>
              <h1 className="text-center mt-2 text-black-main text-lg ">
                Collection
              </h1>
              <h1 className="text-left text-lg text-black-main mt-2">
                SELECT WHICH COLLECTION THIS NFT WILL BE MINTED TO
              </h1>
              <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-5">
                {allCollection.map((index, key) => (
                  <div
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`cursor-pointer  rounded-lg m-2 p-3 ${
                      selected === key ? "border border-chocolate-main/50" : ""
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {index.nft.slice(0, 4).map((nfts, key1) => (
                        <div
                          key={key1}
                          className="flex items-center justify-center"
                        >
                          <Image
                            src={avatar[nfts.id]}
                            className="w-full h-full aspect-square object-cover"
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="avatar"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 bottom-0">{index.name}</div>
                  </div>
                ))}
              </div>
              <div
                className="flex justify-center items-center mt-5 mb-3"
                onClick={() => {
                  () => setMintModalState(false);
                }}
              >
                <button
                  className="border bg-[#000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
                  onClick={handleNext}
                >
                  NEXT
                </button>
                <button
                  className="border bg-[#000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
                  onClick={() => {
                    setSelected(allCollection.length);
                    setStep(1);
                  }}
                >
                  New Collection
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h1 className="text-center mt-2 text-black-main text-lg ">
                NEW COLLECTION
              </h1>
              <h2 className="text-left text-lg text-black-main mt-2">
                COLLECTION NAME
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-chocolate-main  h-[30px] mt-2 w-1/2">
                <input
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-black-main"
                  type="text"
                  placeholder=" E.G. 'Nature'"
                />
              </div>
              <h2 className="text-left text-lg text-black-main mt-2">
                COLLECTION SYMBOL
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-chocolate-main h-[30px] mt-2 w-1/2">
                <input
                  value={newCollectionSymbol}
                  onChange={(e) => setNewCollectionSymbol(e.target.value)}
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-black-main"
                  type="text"
                  placeholder=" E.G. 'NATURE'"
                />
              </div>
              <h2 className="text-left text-lg text-black-main mt-2">
                COLLECTION DESCRIPTION
              </h2>
              <textarea
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                placeholder="Write a description..."
                className="mt-2 outline-none border border-chocolate-main w-4/5 p-[10px] rounded-xl text-black-main"
                rows={4}
              />
              <div
                className="flex justify-between items-center mt-5 mb-3"
                onClick={() => {
                  () => setMintModalState(false);
                }}
              >
                <button
                  className="border bg-[#000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg sm:w-full"
                  onClick={handleBack}
                >
                  BACK
                </button>
                <button
                  className="border bg-[#000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg sm:w-full"
                  onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
=======
>>>>>>> 0b578aadd946aebdd123791683e1e0accd3a92ab
            <div>
              <h1 className="text-center mt-2 text-black-main text-lg ">
                MINT
              </h1>
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
              <h2 className="text-left text-lg text-black-main mt-5">
                MINTING TO
              </h2>
              
                <div>
<<<<<<< HEAD
                  <h2 className="text-left text-lg text-black-main mt-2">
                    COLLECTION NAME
                  </h2>
                  <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                    <input
                      defaultValue={newCollectionName}
                      disabled
                      className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-black-main"
=======
                  <h2 className="text-left text-lg text-chocolate-main mt-2">
                    NAME
                  </h2>
                  <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
>>>>>>> 0b578aadd946aebdd123791683e1e0accd3a92ab
                      type="text"
                      placeholder=" E.G. 'Nature'"
                    />
                  </div>
<<<<<<< HEAD
                  <h2 className="text-left text-lg text-black-main mt-2">
                    COLLECTION SYMBOL
                  </h2>
                  <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                    <input
                      defaultValue={newCollectionSymbol}
                      disabled
                      className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-black-main"
                      type="text"
                      placeholder=" E.G. 'NATURE'"
                    />
                  </div>
                  <h2 className="text-left text-lg text-black-main mt-2">
                    COLLECTION DESCRIPTION
=======
                  
                  <h2 className="text-left text-lg text-chocolate-main mt-2">
                    DESCRIPTION
>>>>>>> 0b578aadd946aebdd123791683e1e0accd3a92ab
                  </h2>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a description..."
                    className="mt-2 outline-none border-2 border-black w-4/5 p-[10px] rounded-xl text-black-main"
                    rows={4}
                  />
                </div>

              <div
                className="flex justify-between items-center mt-5 mb-3"
                onClick={() => {
                  () => setMintModalState(false);
                }}
              >
                <button
<<<<<<< HEAD
                  className="border bg-[#000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
                  onClick={handleBack}
                >
                  BACK
                </button>
                <button
                  className="border bg-[#000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex items-center justify-center"
=======
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex items-center justify-center"
>>>>>>> 0b578aadd946aebdd123791683e1e0accd3a92ab
                  onClick={handleMint}
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
            </div>
        </div>
      </div>
    </>
  );
};

export default MintModal;
