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
import useLoadingControlStore from "@/store/UI_control/loading";
import toast from "react-hot-toast";

//import data
import Groups from "@/data/groups.json";
import NftCard from "@/components/main/cards/nftCard";
import {
  IGROUP,
  IUSER,
  INFT,
  IOFFER_TRANSACTION,
  IDIRECTOR_TRANSACTION,
} from "@/types";
import useAuth from "@/hooks/useAuth";
import { IMGBB_API_KEY } from "@/constants/config";
import EyeIcon from "@/components/svgs/eye_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract, ContractFactory } from "ethers";
import GROUP_ABI from "@/constants/creator_group.json";
import { Marketplace_ADDRESSES } from "@/constants/config";
import MARKETPLACE_ABI from "@/constants/marketplace.json";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAPI from "@/hooks/useAPI";

const acceptables = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

const PrivateGroupProfile = ({ params }: { params: { id: string } }) => {
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
  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: elementTop - 180 + windowScrollTop,
        behavior: "smooth",
      });
    }
  }
  const [soldNfts, setSoldNfts] = useState<INFT[]>([]);
  const [isDirector, setIsDirector] = useState<boolean>(false);

  const [listedNfts, setListedNfts] = useState<INFT[]>([]);
  const [mintedNfts, setMintedNfts] = useState<INFT[]>([]);
  const [offerTransactions, setOfferTransactions] = useState<
    IOFFER_TRANSACTION[]
  >([]);
  const [directorTransactions, setDirectorTransactions] = useState<
    IDIRECTOR_TRANSACTION[]
  >([]);
  const [offerNfts, setOfferNfts] = useState<INFT[]>([]);

  const [members, setMembers] = useState<IUSER[] | undefined>(undefined);

  const { signIn, isAuthenticated, user } = useAuth();
  const [myGroupData, setMyGroupData] = useState<IGROUP | undefined>(undefined);
  const [newPostMessage, setNewPostMessage] = useState<string>("");
  const api = useAPI();
  const getMyGroupData = async () => {
    const { data: Data } = await api.post(`/api/getGroupId`, { id: params.id });
    setMyGroupData(Data);
    if (Data.director === user?.id) setIsDirector(true);
  };
  const getNFTData = async () => {
    const result1 = await api.post("/api/getNftByGroupAndStatus", {
      id: params.id,
      status: "sold",
    });
    console.log("result1", result1.data);
    setSoldNfts(result1.data);
    const result2 = await api.post("/api/getNftByGroupAndStatus", {
      id: params.id,
      status: "list",
    });
    setListedNfts(result2.data);
    console.log("result2", result2.data);
    const result3 = await api.post("/api/getNftByGroupAndStatus", {
      id: params.id,
      status: "mint",
    });
    setMintedNfts(result3.data);
    console.log("result3", result3.data);

    const result4 = await api.post("/api/getOffering", { id: params.id });
    setOfferTransactions(result4.data);
    console.log("result4", result4.data);

    const result5 = await api.post("/api/getDirector", { id: params.id });
    setDirectorTransactions(result5.data);
    console.log("result5", result5.data);
  };
  useEffect(() => {
    getMyGroupData();
    getNFTData();
  }, []);

  const getOffer_nfts = async () => {
    const _nfts = listedNfts.filter((item: INFT) =>
      offerTransactions
        .map((_offer: IOFFER_TRANSACTION) => _offer.nftid)
        .includes(item.id)
    );
    console.log({ _nfts });
    setOfferNfts(_nfts);
  };

  useEffect(() => {
    if (listedNfts && offerTransactions) {
      getOffer_nfts();
    }
  }, [listedNfts, offerTransactions]);

  const getMembersData = async (id: string) => {
    console.log("id", id);
    const { data } = await api.get(`/auth/user/${id}`);
    console.log("DataDATA ---------> ", data);
    return data;
  };
  useEffect(() => {
    if (!myGroupData) return;
    (async () => {
      const _members = await Promise.all(
        myGroupData.member.map(
          async (_member: any) => await getMembersData(_member.id)
        )
      );
      setMembers(_members);
    })();
  }, [myGroupData]);

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
    } catch (err) {
      toast.error("An error occurred. please try again");
      setPreview("");
    }
  };
  const deleteContent = (id: number) => {
    console.log("id", id);
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
    if (myGroupData) {
      const _contract = new Contract(myGroupData?.address, GROUP_ABI, signer);
      setContract(_contract);
      const _market_contract = new Contract(
        Marketplace_ADDRESSES[chainId],
        MARKETPLACE_ABI,
        signer
      );
      setMarketplaceContract(_market_contract);
    }
  }, [address, chainId, signer, myGroupData]);

  const offeringConfrimHandle = async (item: IOFFER_TRANSACTION) => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.confirmOfferingSaleTransaction(
        BigInt(item.transactionid),
        true
      );
      await tx.wait();
      const confirm_member = item.confirm_member;
      confirm_member.push({ id: user.id });
      await api.post("/api/updateOffering", {
        id: item.id,
        confirm_member: JSON.stringify(confirm_member),
      });
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const offeringExecuteHandle = async (
    item: IOFFER_TRANSACTION,
    item_nft: INFT
  ) => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.excuteOfferingSaleTransaction(
        BigInt(item.transactionid)
      );
      await tx.wait();
      await api.post("/api/removeOffering", { id: item.nftid });

      await api.post("/api/updateNft", {
        id: item_nft?.id,
        owner: item.buyer,
        status: "sold",
        auctionType: item_nft?.auctiontype,
        initialPrice: item_nft?.initialprice,
        salePeriod: item_nft?.saleperiod,
        currentPrice: item_nft?.currentprice,
        currentBidder: item_nft?.currentbidder,
        reducingRate: item_nft?.reducingrate,
        listedNumber: item_nft.listednumber,
      });
      getMyGroupData();
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const directorConfrimHandle = async (item: IDIRECTOR_TRANSACTION) => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.confirmDirectorSettingTransaction(
        BigInt(item.transaction_id),
        true
      );
      await tx.wait();
      const confirm_member = item.confirm_member;
      confirm_member.push({ id: user.id });
      await api.post("/api/updateDirector", {
        id: item.id,
        confirm_member: JSON.stringify(confirm_member),
      });
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const directorExecuteHandle = async (item: IDIRECTOR_TRANSACTION) => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.excuteDirectorSettingTransaction(
        BigInt(item.transaction_id)
      );
      await tx.wait();
      await api.post("/api/removeDirector", { id: item.new_director });
      await api.post("/api/updateGroupDirector", {
        id: myGroupData?.id,
        director: item.new_director,
      });
      getMyGroupData();
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawFromGroup = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.withdraw();
      await tx.wait();
      getBalancesForWithdraw();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const withdrawFromMarketplace = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.withdrawFromMarketplace();
      await tx.wait();
      getBalancesForWithdraw();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const leaveGroupHandle = async () => {
    try {
      if (!contract) throw "no contract";
      if (!chainId) throw "Invalid chain id";
      if (!user) throw "You must sign in";
      setIsLoading(true);
      const tx = await contract.removeMember(address);
      await tx.wait();
      const _member = myGroupData?.member.filter(
        (_user) => _user.id !== user.id
      );

      await api.post("/api/updateGroupMember", {
        id: myGroupData?.id,
        member: JSON.stringify(_member),
      });
      getMyGroupData();
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getBalancesForWithdraw = async () => {
    if (!contract) return;
    const withdrawGroupBalance = await contract.balance(address);
    setWithdrawAmount(Number(Number(withdrawGroupBalance) / 1e18).toString());
    const totalEarningAmount = await contract.totalEarning();
    setTotalEarning(Number(Number(totalEarningAmount) / 1e18).toString());
    console.log(
      "(Number(Number(totalEarningAmount) / 1e18)).toString(), ",
      Number(Number(totalEarningAmount) / 1e18).toString()
    );
    await api.post("/api/updateEarning", {
      id: myGroupData?.id,
      earning: Number(Number(totalEarningAmount) / 1e18).toString(),
    });
    console.log("success here it is");
    if (!marketplaceContract) return;

    const withdrawMarketplaceBalance =
      await marketplaceContract.balanceOfSeller(myGroupData?.address);
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
      console.log("selected new director", members[_num].wallet);

      const members_in_group = await contract.members(0);
      const members_in_group1 = await contract.members(1);
      const currentDirector = await contract.director();

      console.log(
        "members:",
        members_in_group,
        " next member:",
        members_in_group1,
        " current director ",
        currentDirector
      );
      console.log("dfafds", members[_num].wallet);

      const tx = await contract.submitDirectorSettingTransaction(
        members[_num].wallet
      );
      await tx.wait();
      const transaction_id = await contract.getNumberOfCandidateTransaction();
      await api.post("/api/addDirector", {
        groupid: myGroupData?.id,
        new_director: members[_num].id,
        suggester: user?.id,
        confirm_member: JSON.stringify([]),
        transaction_id: Number(Number(transaction_id) - 1).toString(),
      });
      getNFTData();
    } catch (error: any) {
      if (String(error.code) === "ACTION_REJECTED") {
        toast.error("User rejected transaction.");
      } else {
        toast.error("An error occurred. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendGroupPost = async () => {
    const now = new Date();
    const formattedDateTime = now.toISOString();
    console.log("currentTime--->", formattedDateTime);
    await api.post("/api/addPost", {
      groupId: myGroupData?.id,
      postTime: formattedDateTime,
      content: newPostMessage,
    });
    setNewPostMessage("");
    toast.success("Successfully posted news!");
  };

  return (
    <>
      {mintModalState && avatar && (
        <MintModal
          groupAddress={myGroupData ? myGroupData.address : ""}
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
            <div className="gap-4 grid xl:grid-cols-2 lg:grid-cols-1 xl:w-[50%] xl:min-w-[920px] xs:w-full xs:h-full">
              <div className="mt-5 xs:w-full xs:h-full">
                {myGroupData && (
                  <Image
                    src={myGroupData?.avatar}
                    className="w-full aspect-square object-cover"
                    alt="group_avatar"
                    width={500}
                    height={500}
                  />
                )}
              </div>
              <div className="group_info mt-5">
                {members && myGroupData && (
                  <GroupDescription
                    users={members}
                    myGroupData={myGroupData}
                    totalEarning={totalEarning}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sticky top-[100px] z-10 hidden md:block">
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
                        {myGroupData?.mintnumber
                          ? myGroupData?.mintnumber
                          : "0"}
                        )
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
                        UPLOADED (0)
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("withdraw");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        WITHDRAW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="page_container_p40 font-Maxeville">
          <div className="flex justify-between text-xl mt-5" id="nfts">
            <div>
              NFTs ({myGroupData?.mintnumber ? myGroupData?.mintnumber : "0"})
            </div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="flex justify-between text-md mt-3">
            <div>SOLD ({soldNfts.length ? soldNfts.length : "0"})</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {soldNfts.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                onClick={() => router.push(`/details/private/sold/${item.id}`)}
              >
                <NftCard
                  avatar={item.avatar}
                  collectionName={item.collectionname}
                  collectionId={Number(item.collectionid)}
                  seen={200}
                  favorite={20}
                  price={Number(item.currentprice)}
                />
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>LISTED ({listedNfts.length})</div>
            <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {listedNfts.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                onClick={() => router.push(`/details/private/live/${item.id}`)}
              >
                <NftCard
                  avatar={item.avatar}
                  collectionName={item.collectionname}
                  collectionId={Number(item.collectionid)}
                  seen={200}
                  favorite={20}
                  price={Number(item.currentprice)}
                />
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>NOT LISTED ({mintedNfts.length})</div>
            <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {mintedNfts.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                onClick={() => router.push(`/details/private/mint/${item.id}`)}
              >
                <NftCard
                  avatar={item.avatar}
                  collectionName={item.collectionname}
                  collectionId={Number(item.collectionid)}
                  seen={200}
                  favorite={20}
                  price={Number(item.currentprice)}
                />
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-lg" id="offers">
            <div>
              OFFERS (
              {offerTransactions.length ? offerTransactions.length : "0"})
            </div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="justify-start gap-2 mt-3 lg:grid lg:grid-cols-2 xs:grid xs:grid-cols-1">
            {offerTransactions.length &&
              myGroupData &&
              members?.length &&
              offerNfts.length &&
              offerTransactions.map((item, key) => (
                <div key={key}>
                  <div className="min-w-[50%] flex mt-[30px] gap-5">
                    <div>
                      <Image
                        src={offerNfts[key].avatar}
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
                      <div className="xs:grid xs:grid-cols-1 lg:grid lg:grid-cols-1 xl:grid xl:grid-cols-3">
                        <div className="flex me-[5px]">
                          <div className="text-gray-400">OFFERED</div>
                          <div className="ms-[5px]">
                            {offerTransactions[key].price} USDC
                          </div>
                        </div>
                        <div className="flex">
                          <div className="text-gray-400">FOR</div>
                          <div className="ms-[5px]">CONTENT</div>
                        </div>
                      </div>
                      <div className="text-gray-400 mt-5 text-md">
                        CONFIRMED BY{" "}
                        {offerTransactions[key].confirm_member.length}/
                        {myGroupData.member.length}
                      </div>
                      <div className="my-[20px]">
                        {renderAvatar(
                          members.filter((item: IUSER) =>
                            offerTransactions[key].confirm_member
                              .map((_id: any) => _id.id)
                              .includes(item.id)
                          )
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <button
                          className="border border-black rounded-full pl-4 pr-4 w-[200px] text-[18px] mb-[5px]"
                          onClick={() =>
                            offeringConfrimHandle(offerTransactions[key])
                          }
                        >
                          CONFIRM
                        </button>
                        <button
                          className="border border-black rounded-full pl-4 pr-4 w-[200px] text-[18px]"
                          onClick={() =>
                            offeringExecuteHandle(
                              offerTransactions[key],
                              offerNfts[key]
                            )
                          }
                        >
                          EXECUTE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-xl" id="create">
            <div>UPLOADED CONTENT (0)</div>
            <div className="border-b-2 border-indigo-500"></div>
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
          </div>
          <Split_line />
          <div className="flex justify-center items-center mt-5">
            <label
              htmlFor="avatar"
              className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg cursor-pointer text-center"
            >
              <input hidden id="avatar" type="file" onChange={onFileChange} />
              UPLOAD NEW
            </label>
          </div>

          <Split_line />

          {isDirector && (
            <>
              <div className="flex justify-between text-xl">
                <div>POST</div>
                <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
              </div>
              <div className="mt-5 gap-5 grid lg:grid-cols-2 xs:grid-cols-1">
                <div>
                  <textarea
                    rows={4}
                    className="p-4 outline-none border w-full border-chocolate-main rounded-lg"
                    placeholder="Write a message to share with those outside your group."
                    value={newPostMessage}
                    onChange={(e) => setNewPostMessage(e.target.value)}
                  />
                  <div className="text-gray-400 text-right">
                    <button
                      className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[102px] text-lg"
                      onClick={sendGroupPost}
                    >
                      SEND
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            </>
          )}
          <div className="flex items-center text-xl">
            <input
              id="default-radio"
              type="checkbox"
              value=""
              name="default-radio"
              className="appearance-none outline-none w-5 h-5 rounded-full border-2 border-chocolate-main checked:bg-chocolate-main checked:border-transparent"
            />
            <label
              htmlFor="default-radio"
              className="ms-2  font-medium text-gray-900 dark:text-gray-300"
            >
              ACTIVELY RECRUITING
            </label>
          </div>
          <div className="text-gray-400">
            Looking to fill a role? set “actively recruiting” so users can find
            your group!
          </div>
          <Split_line />
          <div className="flex justify-between text-xl">
            <div>MANAGE</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="mt-5">
            <h1>SET A NEW DIRECTOR</h1>
          </div>

          <div className="grid grid-cols-8 mt-5 xl:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 m-auto">
            {members && myGroupData && (
              <div
                className={`flex flex-col items-center justify-center cursor-pointer rounded-lg m-2`}
              >
                {members && myGroupData && (
                  <>
                    <div className="aspect-square rounded-full">
                      <Image
                        src={
                          members?.filter((_user: IUSER) =>
                            _user.id.includes(myGroupData?.director)
                          )[0].avatar
                        }
                        className="rounded-full aspect-square object-cover"
                        alt="mebers"
                        width={160}
                        height={160}
                      />
                    </div>
                    <div className="mt-3 justify-center">
                      <p className="flex justify-center">
                        {
                          members?.filter((_user: IUSER) =>
                            _user.id.includes(myGroupData?.director)
                          )[0].name
                        }{" "}
                        (Current Director)
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
            {members &&
              members.map((item, index) => (
                <>
                  <div
                    className={`flex flex-col ${
                      item.id === myGroupData?.director && "hidden"
                    } `}
                  >
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center cursor-pointer rounded-lg m-2 ${
                        selected === index
                          ? "border border-chocolate-main/50"
                          : "border border-white"
                      }`}
                      onClick={() => setSelected(index)}
                    >
                      <div className="aspect-square rounded-full">
                        <Image
                          src={item.avatar}
                          className="rounded-full aspect-square object-cover"
                          alt="mebers"
                          width={160}
                          height={160}
                        />
                      </div>
                      <div className="mt-3 justify-center">
                        <p className="flex justify-center">{item.name} </p>
                      </div>
                    </div>
                    <button
                      className={`border bg-[#322A44] text-white rounded-full text-lg text-center ${
                        item.id === myGroupData?.director ? "hidden" : ""
                      } `}
                      onClick={() => suggestDirectorSetting(index)}
                    >
                      SUGGEST
                    </button>
                  </div>
                </>
              ))}
          </div>

          <div className="flex justify-between text-lg mt-5" id="offers">
            <div>
              SUGGESTED DIRECTORS (
              {directorTransactions.length ? directorTransactions.length : "0"})
            </div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          {directorTransactions &&
            directorTransactions.length &&
            myGroupData &&
            members?.length &&
            members && (
              <div className="justify-start gap-2 mt-3 lg:grid lg:grid-cols-2 xs:grid xs:grid-cols-1">
                {directorTransactions.map((item, key) => (
                  <div key={key}>
                    <div className="min-w-[50%] flex mt-[30px] gap-5">
                      <div>
                        {directorTransactions && members && (
                          <Image
                            src={
                              members?.filter((_user: IUSER) =>
                                _user.id.includes(
                                  directorTransactions[key].new_director
                                )
                              )[0].avatar
                            }
                            className="aspect-square object-cover rounded-lg"
                            width={300}
                            height={300}
                            alt="offer"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="mb-[5px]">
                          {
                            members?.filter((_user: IUSER) =>
                              _user.id.includes(
                                directorTransactions[key].suggester
                              )
                            )[0].name
                          }
                          <span className="text-gray-400">SUGGESTED</span>
                        </div>

                        {members && directorTransactions && (
                          <div className="text-gray-400 mt-5 text-md">
                            CONFIRMED BY{" "}
                            {directorTransactions[key].confirm_member.length
                              ? directorTransactions[key].confirm_member.length
                              : "0"}
                            /{myGroupData.member.length}
                          </div>
                        )}
                        <div className="my-[20px]">
                          {renderAvatar(
                            members.filter((_user: IUSER) =>
                              directorTransactions[key].confirm_member
                                .map((_id: any) => _id.id)
                                .includes(_user.id)
                            )
                          )}
                        </div>
                        <div className="flex flex-col w-full">
                          <button
                            className="border border-black rounded-full pl-4 pr-4 w-[200px] text-[18px] mb-[5px]"
                            onClick={() =>
                              directorConfrimHandle(directorTransactions[key])
                            }
                          >
                            CONFIRM
                          </button>
                          <button
                            className="border border-black rounded-full pl-4 pr-4 w-[200px] text-[18px]"
                            onClick={() =>
                              directorExecuteHandle(directorTransactions[key])
                            }
                          >
                            EXECUTE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          <Split_line />
          <div className="text-xl" id="withdraw">
            <div className="text-md">Withdraw</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="mt-5 text-lg lg:flex">
            <div className="flex gap-5">
              <div className="flex items-center h-[32px]">AMOUNT</div>
              <div className="flex border-2 border-black items-center justify-center pl-5 pr-5 rounded-lg text-gray-400">
                {withdrawAmount ? withdrawAmount : "0"}
              </div>
              <div className="flex items-center h-[32px]">USDC</div>
            </div>
            <div className="lg:block xs:flex xs:justify-center xs:mt-5 lg:mt-0 lg:ms-[25px]">
              <button
                onClick={withdrawFromGroup}
                className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg hover:bg-chocolate-main hover:text-white transition-all"
              >
                Withdraw
              </button>
            </div>
          </div>
          {isDirector && (
            <div className="mt-5 text-lg lg:flex">
              <div className="flex gap-5">
                <div className="flex items-center h-[32px]">AMOUNT</div>
                <div className="flex border-2 border-black items-center justify-center pl-5 pr-5 rounded-lg text-gray-400">
                  {withdrawFromMarketplaceAmount
                    ? withdrawFromMarketplaceAmount
                    : "0"}
                </div>
                <div className="flex items-center h-[32px]">USDC</div>
              </div>

              <div className="lg:block xs:flex xs:justify-center xs:mt-5 lg:mt-0 lg:ms-[25px]">
                <button
                  onClick={withdrawFromMarketplace}
                  className="border border-black rounded-full pl-4 pr-4 w-[300px] text-lg hover:bg-chocolate-main hover:text-white transition-all"
                >
                  Withdraw From Marketplace
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={leaveGroupHandle}
              className="border bg-[#FF0000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
            >
              LEAVE THIS GROUP
            </button>
          </div>
          <Split_line />
        </div>
        <div
          className="mt-[-400px] bg-cover bg-no-repeat h-[920px] w-full -z-10"
          style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
        ></div>
        <Footer />
      </div>
    </>
  );
};

export default PrivateGroupProfile;
