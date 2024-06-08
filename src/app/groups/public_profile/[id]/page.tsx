/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import GroupDescription from "@/components/groups/share/groupDescription";
import Image from "next/image";
import Split_line from "@/components/main/split_line";
import Footer from "@/components/main/footer/footer";

//import data
import useAPI from "@/hooks/useAPI";
import { IGROUP, IUSER, INFT } from "@/types";
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
  const [isMemberOfGroup, setIsMemberOfGroup] = useState<boolean>(false);
  const api = useAPI();

  const getJoinedGroupData = async () => {
    const response = await api
      .post(`/api/getGroupById`, { id: params.id })
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
      .post(`/api/auth/user/getAllMembers`)
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
  };

  useEffect(() => {
    usersInfor();
  }, [myGroupData]);

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
                    description={myGroupData.description}
                    myGroupData={myGroupData}
                    totalEarning={""}
                  />
                )}
              </div>
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
        </div>

        <FooterBG />
        <Footer />
      </div>
    </>
  );
};

export default PublicGroupPage;
