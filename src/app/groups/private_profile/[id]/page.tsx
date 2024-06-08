/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";

import GroupDescription from "@/components/groups/share/groupDescription";
import Image from "next/image";
import Split_line from "@/components/main/split_line";
import Footer from "@/components/main/footer/footer";
import MintModal from "@/components/main/modals/groups/mintModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import { useRouter } from "next/navigation";
import renderAvatar from "@/components/utils/renderAvatar";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import ItemLoaderComponent from "@/components/main/itemLoader";
import NftCard from "@/components/main/cards/nftCard";
import useLoadingControlStore from "@/store/UI_control/loading";

//import data

import {
  IUSER,
  INFT,
  IOFFER_TRANSACTION
} from "@/types";

import useAuth from "@/hooks/useAuth";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract, ContractFactory } from "ethers";
import GROUP_ABI from "@/constants/creator_group.json";
import { Marketplace_ADDRESSES } from "@/constants/config";
import MARKETPLACE_ABI from "@/constants/marketplace.json";
import useDisplayingControlStore from "@/store/UI_control/displaying";
import useAPI from "@/hooks/useAPI";
import { scrollToElement } from "@/components/utils/scrollToElement";
import FooterBG from "@/components/main/footerbg";
import { useGroupInforById } from "@/hooks/views/useGroupInforById";
import { useNftsByGroupAndStatus } from "@/hooks/views/useNftsByGroupAndStatus";
import { useConfirmTransaction } from "@/hooks/views/useConfirmTransaction";

const acceptables = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

const PrivateGroupProfile = ({ params }: { params: { id: string } }) => {
  const setIsDisplaying = useDisplayingControlStore(
    (state) => state.updateDisplayingState
  );
  const setMainText = useDisplayingControlStore(
    (state) => state.updateMainText
  );
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  }, [setLoadingState]);
  const router = useRouter();
  const mintModalState = useGroupUIControlStore((state) => state.mintModal);
  const setMintModalState = useGroupUIControlStore(
    (state) => state.updateMintModal
  );
  const [uploadId, setUploadId] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(0);
  const [selectedSuggestBtn, setSelectedSuggestBtn] = useState<number>(-1);
  const [selectedOfferConfirmBtn, setSelectedOfferConfirmBtn] =
    useState<number>(-1);
  const [selectedOfferExecuteBtn, setSelectedOfferExecuteBtn] =
    useState<number>(-1);
  const [selectedDirectorConfirmBtn, setSelectedDirectorConfirmBtn] =
    useState<number>(-1);
  const [selectedDirectorExecuteBtn, setSelectedDirectorExecuteBtn] =
    useState<number>(-1);
  const [isLoadingWithdrawButton, setIsLoadingWithdrawButton] =
    useState<boolean>(false);
  const [
    isLoadingWithdrawMarketplaceButton,
    setIsLoadingWithdrawMarketplaceButton,
  ] = useState<boolean>(false);
  const [isLoadingLeaveButton, setIsLoadingLeaveButton] =
    useState<boolean>(false);
  const [selectedRequestButton, setSelectedRequestButton] =
    useState<number>(-1);
  const [isLoadingChangeConfirm, setIsLoadingChangeConfirm] =
    useState<boolean>(false);

  const [activeState, setActiveState] = useState<boolean>(false);
  const [requestMembers, setRequestMembers] = useState<IUSER[]>([]);

  const [offerNfts, setOfferNfts] = useState<INFT[]>([]);
  const [members, setMembers] = useState<IUSER[] | undefined>(undefined);

  const { user } = useAuth();
  const [newPostMessage, setNewPostMessage] = useState<string>("");
  const [requiredConfirmNumber, setRequiredConfirmNumber] =
    useState<string>("");

  const api = useAPI();

  const { groupInfor, isDirector, getGroupInforById } = useGroupInforById(
    params.id
  );
  const { soldNfts, listedNfts, mintedNfts, getNFTData } =
    useNftsByGroupAndStatus(params.id);
  const {
    offerTransactions,
    getOfferingTransaction,
  } = useConfirmTransaction(params.id);

  useEffect(() => {
    getGroupInforById();
    getNFTData();
    getOfferingTransaction();
  }, [user]);

  const getOffer_nfts = async () => {
    const nfts: any[] = offerTransactions?.map((_offer: IOFFER_TRANSACTION) =>
      listedNfts?.find((item: INFT) => item.id === _offer.nftid)
    );
    setOfferNfts(nfts as INFT[]);
  };

  useEffect(() => {
    if (listedNfts && offerTransactions) {
      getOffer_nfts();
    }
  }, [listedNfts, offerTransactions]);

  const getMembersData = async (id: string) => {
    const response = await api.get(`/api/auth/user/${id}`).catch((error) => {
      toast.error(error.message);
    });
    const data = response?.data;
    return data;
  };

  useEffect(() => {
    if (!groupInfor) return;
    (async () => {
      const _members = await Promise.all(
        groupInfor?.member.map(
          async (_member: any) => await getMembersData(_member.id)
        )
      );
      setMembers(_members);
    })();
  }, [groupInfor]);

  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [preview, setPreview] = React.useState<string>("");
  const [uploadedContent, setUploadedContent] = useState<string[]>([]);
  const [mintAvatar, setMintAvatar] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [withdrawFromMarketplaceAmount, setWithdrawFromMarketplace] =
    useState<string>("");
  const [totalEarning, setTotalEarning] = useState<string>("");

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
        setUploadedContent([...uploadedContent, _file]);
      };
    } catch (err: any) {
      toast.error(err.message);
      setPreview("");
    }
  };
  const deleteContent = (id: number) => {
    const newArray = [...uploadedContent];
    newArray.splice(id, 1);
    setUploadedContent(newArray);
  };

  const { address, chainId, signer, chain } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [marketplaceContract, setMarketplaceContract] = useState<
    Contract | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    if (groupInfor) {
      const _contract = new Contract(groupInfor?.address, GROUP_ABI, signer);
      setContract(_contract);
      const _market_contract = new Contract(
        Marketplace_ADDRESSES[chainId],
        MARKETPLACE_ABI,
        signer
      );
      setMarketplaceContract(_market_contract);
    }
  }, [address, chainId, signer, groupInfor]);

  const dsiplayMembers = async () => {
    if (!contract) return;
    const _number = await contract.numberOfMembers();
    console.log("groupMembers_number", _number.toString());
  };

  useEffect(() => {
    if (contract) dsiplayMembers();
  }, [contract]);

  const offeringExecuteHandle = async (
    item: IOFFER_TRANSACTION,
    item_nft: INFT
  ) => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      setIsDisplaying(true);
      setMainText("Waiting for user confirmation...");
      const tx = await contract.executeOfferingSaleTransaction(
        BigInt(item.transactionid)
      );
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      setMainText("Waiting for backend process...");
      await api
        .post("/api/removeOffering", { id: item.nftid })
        .catch((error) => {
          toast.error(error.message);
        });

      await api
        .post("/api/updateSoldNft", {
          id: item_nft?.id,
          owner: item.buyer,
          status: "sold",
          currentPrice: item_nft?.currentprice,
        })
        .catch((error) => {
          toast.error(error.message);
        });
      // getJoinedGroupData();
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoading(false);
      setSelectedOfferExecuteBtn(-1);
    }
  };

  
  
  const withdrawFromGroup = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      if (!Number(withdrawAmount)) {
        toast.error("You do not have funds to withdraw!");
        return;
      }
      setIsDisplaying(true);
      setIsLoadingWithdrawButton(true);
      setMainText("Waiting for user confirmation...");
      const tx = await contract.withdraw();
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      getBalancesForWithdraw();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoadingWithdrawButton(false);
    }
  };
  const withdrawFromMarketplace = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      if (!Number(withdrawFromMarketplaceAmount)) {
        toast.error("You do not have funds to withdraw!");
        return;
      }
      setIsDisplaying(true);
      setMainText("Waiting for user confirmation...");
      setIsLoadingWithdrawMarketplaceButton(true);

      const tx = await contract.withdrawFromMarketplace();
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      getBalancesForWithdraw();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoadingWithdrawMarketplaceButton(false);
    }
  };

  const leaveGroupHandle = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsDisplaying(true);
      setIsLoadingLeaveButton(true);
      setMainText("Waiting for user confirmation...");
      const tx = await contract.removeMember(address);
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      const _member = groupInfor?.member.filter(
        (_user) => _user.id !== user.id
      );
      setMainText("Waiting for backend process...");
      await api
        .post("/api/updateGroupMember", {
          id: groupInfor?.id,
          member: JSON.stringify(_member),
        })
        .catch((error) => {
          toast.error(error.message);
        });
      await api
        .post("/api/removeDirector", {
          id: user.id,
        })
        .catch((error) => {
          toast.error(error.message);
        });

      router.push("/groups");
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoadingLeaveButton(false);
    }
  };

  const getBalancesForWithdraw = async () => {
    if (!contract) return;
    const withdrawGroupBalance = await contract.balance(address);
    setWithdrawAmount(Number(Number(withdrawGroupBalance) / 1e18).toString());
    const totalEarningAmount = await contract.totalEarning();
    setTotalEarning(Number(Number(totalEarningAmount) / 1e18).toString());

    await api
      .post("/api/updateEarning", {
        id: groupInfor?.id,
        earning: Number(Number(totalEarningAmount) / 1e18).toString(),
      })
      .catch((error) => {
        toast.error(error.message);
      });
    if (!marketplaceContract) return;
    const withdrawMarketplaceBalance =
      await marketplaceContract.balanceOfSeller(groupInfor?.address);
    setWithdrawFromMarketplace(
      Number(Number(withdrawMarketplaceBalance) / 1e18).toString()
    );
  };

  useEffect(() => {
    getBalancesForWithdraw();
  }, [contract, marketplaceContract]);

  const suggestDirectorSetting = async (_num: number) => {
    try {
      if (!members) return;
      if (!contract) return;
      if (!user) return;
      setIsLoading(true);
      setIsDisplaying(true);
      setMainText("Waiting for user confirmation...");
      const members_in_group = await contract.members(0);
      const members_in_group1 = await contract.members(1);
      const currentDirector = await contract.director();
      const tx = await contract.submitDirectorSettingTransaction(
        members[_num].wallet
      );
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      const transaction_id = await contract.getNumberOfCandidateTransaction();
      setMainText("Waiting for backend process...");
      await api
        .post("/api/addDirector", {
          groupid: groupInfor?.id,
          new_director: members[_num].id,
          suggester: user?.id,
          confirm_member: JSON.stringify([]),
          transaction_id: Number(Number(transaction_id) - 1).toString(),
        })
        .catch((error) => {
          toast.error(error.message);
        });
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoading(false);
      setSelectedSuggestBtn(-1);
    }
  };

  const sendGroupPost = async () => {
    const now = new Date();
    const formattedDateTime = now.toISOString();
    // console.log("currentTime--->", formattedDateTime);
    await api
      .post("/api/addPost", {
        groupId: groupInfor?.id,
        content: newPostMessage,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setNewPostMessage("");
    getNFTData();
    toast.success("Successfully posted news!");
  };

  const changeActiveState = async (_activeState: boolean) => {
    const result = await api
      .post("/api/updateActiveState", {
        id: params.id,
        activeState: _activeState,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setActiveState(_activeState);
    toast.success("Successfully updated");
  };

  const addMember = async (index: number) => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      if (!groupInfor) throw "No groupdata";

      setIsDisplaying(true);
      setIsLoading(true);
      setMainText("Waiting for user confirmation...");
      const tx = await contract.addMember(requestMembers[index].wallet);
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      console.log("asdf");
      const _members = groupInfor?.member;
      console.log("_members", _members);
      console.log("_members again", _members);
      setMainText("Waiting for backend process...");
      const result1 = await api
        .post("/api/removeJoinRequest", {
          groupId: params.id,
          userId: requestMembers[index].id,
        })
        .catch((error) => {
          toast.error(error.message);
        });
      console.log("here1");
      const result = await api
        .post("/api/updateGroupMember", {
          id: params.id,
          member: JSON.stringify(_members),
        })
        .catch((error) => {
          toast.error(error.message);
        });
      console.log("here2");
      // getJoinedGroupData();
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoading(false);
    }
  };

  const changeConfirmNumberHandle = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      if (!groupInfor) throw "No groupdata";

      if (
        Number(requiredConfirmNumber) > groupInfor.member.length ||
        Number(requiredConfirmNumber) < 0
      ) {
        toast.error("Invalid confirm number");
        return;
      }
      setIsDisplaying(true);
      setIsLoadingChangeConfirm(true);
      setMainText("Waiting for user confirmation...");

      const tx = await contract.setConfirmationRequiredNumber(
        BigInt(requiredConfirmNumber)
      );
      setMainText("Waiting for transaction confirmation...");
      await tx.wait();
      setMainText("Waiting for backend process...");
      const result = await api
        .post("/api/updateGroupConfirmNumber", {
          id: groupInfor.id,
          confirmNumber: Number(requiredConfirmNumber).toString(),
        })
        .catch((error) => {
          toast.error(error.message);
        });
      // getJoinedGroupData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsDisplaying(false);
      setIsLoadingChangeConfirm(false);
    }
  };

  const formatDateWithTimeZone = (
    timestampInSeconds: number,
    timeZone: string
  ) => {
    // Convert the timestamp to milliseconds
    const timestampInMilliseconds = timestampInSeconds * 1000;

    // Create a new Date object
    const date = new Date(timestampInMilliseconds);

    // Define options for formatting
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: timeZone,
      timeZoneName: "short",
    };

    // Format the date and time
    const dateString = date.toLocaleString("en-US", options);

    return dateString;
  };
  return (
    <>
      {mintModalState && avatar && (
        <MintModal
          groupAddress={groupInfor ? groupInfor.address : ""}
          collectionAddress={groupInfor ? groupInfor.collection_address : ""}
          groupId={parseInt(params.id)}
          mintAvatar={mintAvatar}
          avatarFile={avatar}
          deleteContent={deleteContent}
          uploadId={uploadId}
          getNFTData={getNFTData}
        />
      )}
      <div className="pt-[100px] h-full">
        <div className="page_container_p40 flex font-Maxeville" id="profile">
          <div>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:w-[50%] xl:min-w-[920px] xs:w-full xs:h-full">
              <div className="mt-5 xs:w-full xs:h-full">
                {groupInfor && (
                  <Image
                    src={groupInfor?.avatar}
                    className="w-full aspect-square object-cover"
                    alt="group_avatar"
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <div className="mt-5">
                {members && groupInfor && (
                  <GroupDescription
                    users={members}
                    description={groupInfor?.description}
                    myGroupData={groupInfor}
                    totalEarning={totalEarning}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-[100px] z-20 hidden md:block">
          <nav className="bg-white bg-opacity-95 border-b-[1px] page_container_p40 font-Maxeville">
            <div>
              <div className="flex items-center h-16">
                <div className="flex items-center cursor-pointer">
                  <div className="flex-shrink-0">{/* Logo */}</div>
                  <div className="">
                    <div className="flex items-baseline space-x-4">
                      <a
                        onClick={() => {
                          scrollToElement("profile");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 py-2 text-lg"
                      >
                        PROFILE
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("nfts");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        NFTS (
                        {groupInfor?.mintnumber ? groupInfor?.mintnumber : "0"})
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("offers");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        OFFERS (
                        {offerTransactions ? offerTransactions.length : "0"})
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("create");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        NEW PRODUCT (0)
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("manage");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        MANAGE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="page_container_p40 font-Maxeville">
          <div className="flex justify-between text-xl my-5" id="nfts">
            <div className="font-bold">
              NFTs ({groupInfor?.mintnumber ? groupInfor?.mintnumber : "0"})
            </div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>SOLD ({soldNfts?.length ? soldNfts.length : "0"})</div>
            <div className=" cursor-pointer border-b-[1px] hover:border-chocolate-main active:translate-y-[2px] transition-all">
            </div>
          </div>
          <ItemLoaderComponent data={soldNfts} />
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {soldNfts?.map((item, index) => (
              <NftCard
                key={index}
                id={item.id}
                basePath="/details/private/sold"
                content={item.content}
                name={item.name}
                description={item.description}
                seen={200}
                favorite={20}
                price={Number(item.currentprice)}
              />
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>LISTED ({listedNfts?.length})</div>
            <div className=" cursor-pointer border-b-[1px] hover:border-chocolate-main active:translate-y-[2px] transition-all">
            </div>
          </div>
          <ItemLoaderComponent data={listedNfts} />
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {listedNfts.map((item, index) => (
              <NftCard
                key={index}
                id={item.id}
                basePath="/details/private/live"
                content={item.content}
                name={item.name}
                description={item.description}
                seen={200}
                favorite={20}
                price={Number(item.currentprice)}
              />
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>NOT LISTED ({mintedNfts.length})</div>
            <div className=" cursor-pointer border-b-[1px] hover:border-chocolate-main active:translate-y-[2px] transition-all">
            </div>
          </div>
          <ItemLoaderComponent data={mintedNfts} />
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {mintedNfts.map((item, index) => (
              <NftCard
                key={index}
                id={item.id}
                basePath="/details/private/mint"
                content={item.content}
                name={item.name}
                description={item.description}
                seen={200}
                favorite={20}
                price={Number(item.currentprice)}
              />
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-xl" id="create">
            <div className="font-bold">NEW PRODUCTS</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
            {uploadedContent.map((_content: string, item: number) => (
              <div key={item} className="flex flex-col">
                <div>
                  <div className="content-card relative ">
                    <Image
                      src={_content}
                      className="w-full h-full aspect-square object-cover rounded-lg"
                      width={300}
                      height={300}
                      alt="uploaded content"
                    />
                    {isDirector && (
                      <div className="content-card-menu hidden justify-center gap-1 flex-col items-center absolute top-0 w-full h-full bg-chocolate-main/80 rounded-lg">
                        <button
                          className="border bg-[#322A44] text-white rounded-full w-[75%] text-[18px] h-[30px]"
                          onClick={() => {
                            setMintModalState(true);
                            setUploadId(item);
                            setMintAvatar(_content);
                          }}
                        >
                          MINT
                        </button>
                        <button
                          className="border bg-[#EF2121] text-white rounded-full w-[75%] text-[18px] h-[30px]"
                          onClick={() => deleteContent(item)}
                        >
                          DELETE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <label
              htmlFor="upload_content"
              className=" bg-gray-200 w-full h-full content-card aspect-square text-lg cursor-pointer flex justify-center items-center"
            >
              <input
                hidden
                id="upload_content"
                type="file"
                onChange={onFileChange}
              />
              +
            </label>
          </div>

          <Split_line />
          <div className="flex justify-between text-lg" id="offers">
            <div className="font-bold">OFFERS ({offerTransactions.length})</div>
          </div>
          <ItemLoaderComponent data={offerTransactions} />
          <div className="justify-start gap-2 mt-3 lg:grid lg:grid-cols-2 xs:grid xs:grid-cols-1">
            {offerTransactions?.map((item, key) => (
              <div key={key}>
                <div className="flex mt-[30px] gap-5 border rounded-xl p-5">
                  <div>
                    <Image
                      src={offerNfts[key]?.content}
                      className="aspect-square object-cover rounded-lg"
                      width={300}
                      height={300}
                      alt="offer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-[5px]">
                      {offerTransactions[key].buyer}
                    </div>
                    <div className="">
                      <div className="flex me-[5px]">
                        <div className="text-gray-400">OFFERED</div>
                        <div className="ms-[5px]">
                          {offerTransactions[key]?.price} USDC
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      
                      <button
                          className="border border-chocolate-main rounded-full pl-4 pr-4 w-[200px] text-[18px] text-center flex items-center justify-center"
                          onClick={() => {
                            offeringExecuteHandle(
                              offerTransactions[key],
                              offerNfts[key]
                            );
                            setSelectedOfferExecuteBtn(key);
                          }}
                        >
                          {selectedOfferExecuteBtn === key ? (
                            <>
                              <Icon
                                icon="eos-icons:bubble-loading"
                                width={20}
                                height={20}
                              />
                              PROCESSING...
                            </>
                          ) : (
                            "EXECUTE"
                          )}
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Split_line />
          <div className="flex justify-between text-xl">
            <div id="manage">MANAGE</div>
          </div>
          <div className="mt-5">
            <h1>SET A NEW DIRECTOR</h1>
          </div>
          <Split_line />
          <div className="text-xl" id="withdraw">
            <div className="text-md">WITHDRAW</div>
          </div>
          <div className="mt-5 text-lg lg:flex">
            <div className="flex gap-5">
              <div className="flex items-center h-[32px]">AMOUNT:</div>
              <div className="flex border border-chocolate-main items-center justify-center pl-5 pr-5 rounded-lg text-gray-400">
                {withdrawAmount ? withdrawAmount : "0"}
              </div>
              <div className="flex items-center h-[32px]">USDC</div>
            </div>
            <div className="lg:block xs:flex xs:justify-center xs:mt-5 lg:mt-0 lg:ms-[25px]">
              <button
                onClick={withdrawFromGroup}
                className="border border-chocolate-main rounded-full px-[50px] text-lg hover:bg-chocolate-main hover:text-white transition-all text-center flex items-center justify-center xs:w-full md:w-auto"
              >
                {isLoadingWithdrawButton ? (
                  <>
                    <Icon
                      icon="eos-icons:bubble-loading"
                      width={20}
                      height={20}
                    />{" "}
                    PROCESSING...
                  </>
                ) : (
                  "WITHDRAW"
                )}
              </button>
            </div>
          </div>
          {isDirector && (
            <div className="mt-5 text-lg lg:flex">
              <div className="flex gap-5">
                <div className="flex items-center h-[32px]">AMOUNT:</div>
                <div className="flex border border-chocolate-main items-center justify-center pl-5 pr-5 rounded-lg text-gray-400 ">
                  {withdrawFromMarketplaceAmount
                    ? withdrawFromMarketplaceAmount
                    : "0"}
                </div>
                <div className="flex items-center h-[32px]">USDC</div>
              </div>

              <div className="lg:block xs:flex xs:justify-center xs:mt-5 lg:mt-0 lg:ms-[25px]">
                <button
                  onClick={withdrawFromMarketplace}
                  className="border border-chocolate-main rounded-full px-[50px] xs:w-full md:w-auto text-lg hover:bg-chocolate-main hover:text-white transition-all text-center flex items-center justify-center"
                >
                  {isLoadingWithdrawMarketplaceButton ? (
                    <>
                      <Icon
                        icon="eos-icons:bubble-loading"
                        width={20}
                        height={20}
                      />{" "}
                      PROCESSING...
                    </>
                  ) : (
                    "WITHDRAW FROM SQUAD"
                  )}
                </button>
              </div>
            </div>
          )}
          {!isDirector && (
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={leaveGroupHandle}
                className="border bg-[#FF0000] texxt-white rounded-full pl-4 pr-4 w-[380px] text-lg text-center flex items-center justify-center"
              >
                {isLoadingLeaveButton ? (
                  <>
                    <Icon
                      icon="eos-icons:bubble-loading"
                      width={20}
                      height={20}
                    />{" "}
                    PROCESSING...
                  </>
                ) : (
                  "LEAVE THIS GROUP"
                )}
              </button>
            </div>
          )}
          <Split_line />
        </div>
        <FooterBG />
        <Footer />
      </div>
    </>
  );
};

export default PrivateGroupProfile;
