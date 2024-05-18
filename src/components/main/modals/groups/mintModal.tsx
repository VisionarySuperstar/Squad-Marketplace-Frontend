/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import collectionData from "@/data/collections.json";
import mygroupsData from "@/data/mygroups.json";
import useAPI from "@/hooks/useAPI";
import { IGROUP, IUSER, INFT, ICOLLECTION } from "@/types";
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
  mintAvatar: string;
  avatarFile: File;
  uploadId: number;
  deleteContent: (id: number) => void;
  getNFTData: () => void;
}
const MintModal = ({
  groupId,
  groupAddress,
  mintAvatar,
  avatarFile,
  deleteContent,
  uploadId,
  getNFTData,
}: MintModalInterface) => {
  const setIsDisplaying = useDisplayingControlStore(
    (state) => state.updateDisplayingState
  );

  const [allCollection, setAllCollection] = useState<ICOLLECTION[]>([]);
  const [showProgressModal, setShowProgressModal] =
    React.useState<boolean>(false);
  const [stepper, setStepper] = React.useState<number>(0);
  const [percent, setPercent] = React.useState<number>(0);
  const api = useAPI();

  const setMintModalState = useGroupUIControlStore(
    (state) => state.updateMintModal
  );
  const [selected, setSelected] = React.useState<number>(0);
  const [step, setStep] = React.useState<number>(0);
  const [lastStep, setLastStep] = React.useState<number>(0);
  const [avatar, setAvatar] = React.useState<Record<string, string>>({});
  const handleNext = () => {
    setLastStep(step);
    if (!step) {
      //if (selected === allCollection.length) setStep(1);
      setStep(2);
    }
    if (step === 1) {
      if (newCollectionName && newCollectionSymbol && newCollectionDescription)
        setStep(2);
    }
  };
  const handleBack = () => {
    if (step === 2) {
      setStep(lastStep);
    } else if (step === 1) {
      setStep(0);
    }
  };
  const [newCollectionName, setNewCollectionName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [newCollectionSymbol, setNewCollectionSymbol] =
    React.useState<string>("");
  const [newCollectionDescription, setNewCollectionDescription] =
    React.useState<string>("");
  const { signIn, isAuthenticated, user } = useAuth();

  const getCollectionData = async () => {
    const result = await api.get("/api/getCollection").catch((error) => {
      toast.error(error.message);
    });
    setAllCollection(result?.data);
    console.log("result", result?.data);
  };
  useEffect(() => {
    getCollectionData();
  }, []);
  useEffect(() => {
    const fetchAvatars = async () => {
      const _avatarQuery: Record<string, string> = {};

      // Use Promise.all to wait for all promises to resolve
      await Promise.all(
        allCollection.flatMap((collection) =>
          collection.nft.map((id) => getNftById(id.id))
        )
      ).then((results) => {
        results.forEach((index, idIndex) => {
          // Assuming id.id is the key and index.avatar is the value
          _avatarQuery[index.id] = index.avatar;
        });
      });

      console.log("_avatarQuery", _avatarQuery);
      setAvatar(_avatarQuery);
    };
    fetchAvatars();
  }, [allCollection]);
  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    const _contract = new Contract(groupAddress, GROUP_ABI, signer);
    setContract(_contract);
  }, [address, chainId, signer, groupAddress]);
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
  const handleMint = async () => {
    // mint
    let collection_address = "",
      collection_name;
    if (selected === allCollection.length) {
      collection_name = newCollectionName;
    } else {
      collection_address = allCollection[selected].address;
      collection_name = allCollection[selected].name;
    }
    let collection_id = "1";

    // console.log("mintAvatar, ", avatarFile);
    // const formData = new FormData();
    // formData.append("image", avatarFile);
    // const { data: { url: _newAvatar } } = await fetch(
    //   `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    //   {
    //     method: "POST",
    //     body: formData
    //   }
    // ).then(res => res.json());
    // _avatar = _newAvatar;
    // progress Modal show
    setShowProgressModal(true);
    setIsLoading(true);
    setIsDisplaying(true);
    // @step1 upload logo to PINATA
    setStepper(1);
    setPercent(0);
    const _avatar = await uploadToIPFS(
      new File([avatarFile], "metadata.json"),
      ({ loaded, total }: { loaded: number; total: number }) => {
        setPercent(Math.floor((loaded * 100) / total));
        console.log(percent);
      }
    ).catch((err) => {
      console.log(err);
      throw "Project Data upload failed to IPFS. Please retry.";
    });
    console.log("@logoURI: ", _avatar);
    setStepper(2) ;
    setPercent(0) ;
    const _metadata = await uploadToIPFS(
      new File([
        JSON.stringify({
          assetType: "image",
          image: _avatar,
        })
      ], "metadata.json"),  
      ({ loaded, total }: { loaded: number; total: number }) => {
        setPercent(Math.floor((loaded * 100) / total));
        console.log(percent);
      }
    ).catch((err) => {
      console.log(err);
      throw "Project Data upload failed to IPFS. Please retry.";
    });
    console.log("@logoURI: ", _avatar);
    setStepper(3);
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      //setIsLoading(true);
      if (selected === allCollection.length) {
        const tx = await contract.mintNew(
          _metadata,
          newCollectionName,
          newCollectionSymbol,
          newCollectionDescription
        );
        await tx.wait();
        const newMintNftId = await contract.numberOfNFT();
        collection_address = await contract.getNftAddress(
          Number(newMintNftId) - 1
        );
      } else {
        const tx = await contract.mint(_avatar, collection_address);
        await tx.wait();
      }
      const _contract = new Contract(collection_address, NFT_ABI, signer);
      const collection_id_1 = await _contract.tokenNumber();
      console.log("collection_id: " + collection_id_1);
      collection_id = Number(Number(collection_id_1) - 1).toString();
      console.log("collection_id", collection_id);

      await api
        .post("/api/addNft", {
          collectionAddress: collection_address,
          collectionId: collection_id,
          avatar: _avatar,
          groupId: groupId,
          owner: groupAddress,
          status: "mint",
          collectionName: collection_name,
        })
        .then(async () => {
          const result = await api
            .post("/api/getNftByCollection", {
              collectionAddress: collection_address,
              collectionId: collection_id,
            })
            .catch((error) => {
              toast.error(error.message);
            });
          console.log("result ", result?.data);
          if (selected === allCollection.length) {
            const nft_collection = [{ id: result?.data.id }];
            console.log("nft_collection", nft_collection);
            await api
              .post("/api/addCollection", {
                name: newCollectionName,
                symbol: newCollectionSymbol,
                description: newCollectionDescription,
                address: collection_address,
                nft: JSON.stringify(nft_collection),
              })
              .catch((error) => {
                toast.error(error.message);
              });
          } else {
            const nft_collection_data = allCollection[selected].nft;
            nft_collection_data.push({ id: result?.data.id });
            console.log("nft_collection_data", nft_collection_data);
            await api
              .post("/api/updateCollection", {
                id: allCollection[selected].id,
                nft: JSON.stringify(nft_collection_data),
              })
              .catch((error) => {
                toast.error(error.message);
              });
          }
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
    
      <div className="z-100 font-Maxeville text-chocolate-main">
        <div
          className="bg-black/35 w-[100vw] h-[100vh] fixed top-0 z-[1000]"
          onClick={() => {
            setMintModalState(false);
          }}
        ></div>
        <div className="generalModal z-[1300] drop-shadow-lg p-[25px]">
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
                fill="#322A44"
              />
            </svg>
          </div>

          {!step && (
            <div>
              <h1 className="text-center mt-2 text-chocolate-main text-lg ">
                Collection
              </h1>
              <h1 className="text-left text-lg text-chocolate-main mt-2">
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
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
                  onClick={handleNext}
                >
                  NEXT
                </button>
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
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
              <h1 className="text-center mt-2 text-chocolate-main text-lg ">
                NEW COLLECTION
              </h1>
              <h2 className="text-left text-lg text-chocolate-main mt-2">
                COLLECTION NAME
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-chocolate-main  h-[30px] mt-2 w-1/2">
                <input
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                  type="text"
                  placeholder=" E.G. 'Nature'"
                />
              </div>
              <h2 className="text-left text-lg text-chocolate-main mt-2">
                COLLECTION SYMBOL
              </h2>
              <div className="flex p-[1px] border rounded-[30px] border-chocolate-main h-[30px] mt-2 w-1/2">
                <input
                  value={newCollectionSymbol}
                  onChange={(e) => setNewCollectionSymbol(e.target.value)}
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                  type="text"
                  placeholder=" E.G. 'NATURE'"
                />
              </div>
              <h2 className="text-left text-lg text-chocolate-main mt-2">
                COLLECTION DESCRIPTION
              </h2>
              <textarea
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
                placeholder="Write a description..."
                className="mt-2 outline-none border border-chocolate-main w-4/5 p-[10px] rounded-xl text-chocolate-main"
                rows={4}
              />
              <div
                className="flex justify-between items-center mt-5 mb-3"
                onClick={() => {
                  () => setMintModalState(false);
                }}
              >
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg sm:w-full"
                  onClick={handleBack}
                >
                  BACK
                </button>
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg sm:w-full"
                  onClick={handleNext}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h1 className="text-center mt-2 text-chocolate-main text-lg ">
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
              <h2 className="text-left text-lg text-chocolate-main mt-5">
                MINTING TO
              </h2>
              {selected === allCollection.length ? (
                <div>
                  <h2 className="text-left text-lg text-chocolate-main mt-2">
                    COLLECTION NAME
                  </h2>
                  <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                    <input
                      defaultValue={newCollectionName}
                      disabled
                      className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                      type="text"
                      placeholder=" E.G. 'Nature'"
                    />
                  </div>
                  <h2 className="text-left text-lg text-chocolate-main mt-2">
                    COLLECTION SYMBOL
                  </h2>
                  <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                    <input
                      defaultValue={newCollectionSymbol}
                      disabled
                      className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                      type="text"
                      placeholder=" E.G. 'NATURE'"
                    />
                  </div>
                  <h2 className="text-left text-lg text-chocolate-main mt-2">
                    COLLECTION DESCRIPTION
                  </h2>
                  <textarea
                    defaultValue={newCollectionDescription}
                    disabled
                    placeholder="Write a description..."
                    className="mt-2 outline-none border-2 border-black w-4/5 p-[10px] rounded-xl text-chocolate-main"
                    rows={4}
                  />
                </div>
              ) : (
                <div className="p-1 w-1/4 mt-5 border-2 border-gray-400">
                  <div className="grid grid-cols-2 gap-2">
                    {allCollection[selected].nft
                      .slice(0, 4)
                      .map((nfts, key1) => (
                        <div
                          key={key1}
                          className="flex items-center justify-center"
                        >
                          <Image
                            src={avatar[nfts.id]}
                            className="w-full h-full aspect-square"
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="avatar"
                          />
                        </div>
                      ))}
                  </div>
                  <div className="mt-1 bottom-0">
                    {allCollection[selected].name}
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center mt-5 mb-3"
                onClick={() => {
                  () => setMintModalState(false);
                }}
              >
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
                  onClick={handleBack}
                >
                  BACK
                </button>
                <button
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex items-center justify-center"
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
          )}
        </div>
      </div>
    </>
  );
};

export default MintModal;
