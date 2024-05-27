/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import GroupDescription from "@/components/groups/share/groupDescription";
import Image from "next/image";
import Split_line from "@/components/main/split_line";
import Footer from "@/components/main/footer/footer";

//import data
import useAPI from "@/hooks/useAPI";
import { IGROUP, IUSER, INFT, IPOST_NEWS, IRequest } from "@/types";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import NftCard from "@/components/main/cards/nftCard";
import ItemLoaderComponent from "@/components/main/itemLoader";
import FooterBG from "@/components/main/footerbg";
import { scrollToElement } from "@/components/utils/scrollToElement";

const PublicGroupPage = ({ params }: { params: { id: string } }) => {
  const [members, setMembers] = useState<IUSER[] | undefined>(undefined);
  const { user } = useAuth();
  const [myGroupData, setMyGroupData] = useState<IGROUP | undefined>(undefined);
  const [nftData, setNftData] = useState<INFT[] | undefined>(undefined);
  const [postNews, setPostNews] = useState<IPOST_NEWS[] | undefined>(undefined);
  const [isAvailableRequest, setIsAvailableRequest] = useState<boolean>(true);
  const [isMemberOfGroup, setIsMemberOfGroup] = useState<boolean>(false);
  const api = useAPI();

  const getJoinedGroupData = async () => {
    const response = await api
      .post(`/api/getGroupId`, { id: params.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setMyGroupData(response?.data);
  };

  const getNftData = async () => {
    const response = await api
      .post("/api/getNftByGroupAndStatus", {
        id: params.id,
        status: "list",
      })
      .catch((error) => {
        toast.error(error.message);
      });
    console.log(response?.data);

    setNftData(response?.data);
  };

  useEffect(() => {
    getJoinedGroupData();
    getNftData();
  }, []);

  const usersInfor = async () => {
    if (!myGroupData) return;
    console.log("myGroupData", myGroupData);
    console.log("myNft", nftData);
    const response = await api
      .post(`/auth/user/getAllMembers`)
      .catch((error) => {
        toast.error(error.message);
      });
    const _all_members = response?.data;
    console.log("_all_members", _all_members);
    const _members = _all_members.filter((_user: IUSER) =>
      myGroupData.member
        .map((_groupUser: any) => _groupUser.id)
        .includes(_user.id)
    );
    console.log("_members", _members);
    setMembers(_members);
    const result_postNews = await api
      .post("/api/getPostByGroupId", {
        id: params.id,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setPostNews(result_postNews?.data);
  };

  const checkIsAvailableRequest = async () => {
    if (!myGroupData) return;
    if (!user) return;
    let flg = false;
    
    flg = myGroupData.member.map((_user: any) => _user.id).includes(user.id);
    if(flg) setIsMemberOfGroup(true) ;
    if (!flg) {
      const result = await api
        .post("/api/getJoinRequestByGroupId", { id: params.id })
        .catch((error) => {
          toast.error(error.message);
        });
      console.log("result for all join request", result?.data);
      console.log("user id", user.id);
      const all_requests: IRequest[] = result?.data;
      flg = all_requests
        .map((_request: IRequest) => _request.userid.toString())
        .includes(user.id);
    }


    setIsAvailableRequest(flg);
  };

  useEffect(() => {
    usersInfor();
    checkIsAvailableRequest();
  }, [myGroupData]);

  const requestJoinHandle = async () => {
    const response = await api
      .post(`/api/addJoinRequest`, {
        groupId: params.id,
        userId: user?.id,
      })
      .catch((error) => {
        toast.error(error.message);
      });
    toast.success("Successfully submitted join request!");
    checkIsAvailableRequest();
  };
  const cancelRequestHandle = async () => {

    const response = await api
    .post(`/api/removeJoinRequest`, {
      groupId: params.id,
      userId: user?.id,
    })
    .catch((error) => {
      toast.error(error.message);
    });
  toast.success("Successfully canceled request!");
  checkIsAvailableRequest();
  }
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
      <div className="pt-[100px] h-full">
        <div className="page_container_p40 flex font-Maxeville" id="profile">
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row  md:justify-between w-full">
            <div className="gap-4 grid xl:grid-cols-2 lg:grid-cols-1 xl:w-[50%] xl:min-w-[920px] xs:p-0">
              <div className="mt-5">
                {myGroupData && (
                  <Image
                    src={myGroupData?.avatar}
                    className="w-full aspect-square object-cover"
                    alt="group_avatar"
                    width={300}
                    height={300}
                  />
                )}
              </div>
              <div className="mt-5">
                {members && myGroupData && (
                  <GroupDescription
                    users={members}
                    myGroupData={myGroupData}
                    totalEarning={""}
                  />
                )}
              </div>
            </div>
            <div className="mt-5 xs:flex sm:justify-center xs:justify-center h-[30px] ">
              {!isAvailableRequest && (
                <button
                  className="border border-chocolate-main bg-white p-1 text-chocolate-main rounded-full flex items-center pl-6 pr-6 text-md hover:bg-chocolate-main hover:text-white active:translate-y-[1px] transition-all"
                  onClick={() => requestJoinHandle()}
                >
                  REQUEST TO JOIN
                </button>
              )}
              {
                isAvailableRequest && !isMemberOfGroup && (
                  <button
                    className="border border-chocolate-main bg-[#322A44] p-1 text-white rounded-full flex items-center pl-6 pr-6 text-md hover:bg-white hover:text-chocolate-main active:translate-y-[1px] transition-all"
                    onClick={() => cancelRequestHandle()}
                  >
                    CANCEL REQUEST
                  </button>
                )
              }
            </div>
          </div>
        </div>

        <div className="page_container_p40 font-Maxeville">
          <div className="flex justify-between text-xl mt-5" id="nfts">
            <div>
              NFTS BY THIS GROUP ({nftData?.length ? nftData?.length : "0"})
            </div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <ItemLoaderComponent data={nftData} />
          <div className="mb-[50px] grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
            {nftData?.map((item, index) => (
              <NftCard
                key={index}
                id={item.id}
                avatar={item.avatar}
                collectionName={item.collectionname}
                collectionId={Number(item.collectionid)}
                seen={200}
                favorite={20}
                price={Number(item.currentprice)}
              />
            ))}
          </div>
          <Split_line />
        </div>

        <FooterBG />
        <Footer />
      </div>
    </>
  );
};

export default PublicGroupPage;
