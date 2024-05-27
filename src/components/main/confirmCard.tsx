"use client";
import { IGROUP, IOFFER_TRANSACTION, IUSER } from "@/types";
import Image from "next/image";
import renderAvatar from "@/components/utils/renderAvatar";

const ConfirmCard = (
  item: any,
  offerNfts: IGROUP[],
  offerTransactions: IOFFER_TRANSACTION[],
  groupInfor: any,
  members: IUSER[],
  key: number
) => {
  return (
    <>
        <div className="flex mt-[30px] gap-5 border rounded-xl p-5">
          <div>
            <Image
              src={offerNfts[key]?.avatar}
              className="aspect-square object-cover rounded-lg"
              width={300}
              height={300}
              alt="offer"
            />
          </div>
          <div className="flex flex-col">
            <div className="mb-[5px]">{offerTransactions[key].buyer}</div>
            <div className="">
              <div className="flex me-[5px]">
                <div className="text-gray-400">OFFERED</div>
                <div className="ms-[5px]">
                  {offerTransactions[key]?.price} USDC
                </div>
              </div>
            </div>
            <div className="text-gray-400 mt-5 text-md">
              CONFIRMED {offerTransactions[key].confirm_member.length}/
              {groupInfor?.member.length}
            </div>
            <div className="my-[20px]">
              {members &&
                renderAvatar(
                  members?.filter((item: IUSER) =>
                    offerTransactions[key]?.confirm_member
                      .map((_id: any) => _id.id)
                      .includes(item.id)
                  )
                )}
            </div>
            <div className="flex flex-col w-full">
              {item.confirm_member.filter((_item: any) => _item.id === user?.id)
                .length === 0 &&
                item.confirm_member.length <
                  Number(groupInfor?.requiredconfirmnumber) && (
                  <button
                    className="border border-chocolate-main rounded-full pl-4 pr-4 w-[200px] text-[18px] mb-[5px] text-center flex items-center justify-center"
                    onClick={() => {
                      offeringConfrimHandle(offerTransactions[key]);
                      setSelectedOfferConfirmBtn(key);
                    }}
                  >
                    {selectedOfferConfirmBtn === key ? (
                      <>
                        <Icon
                          icon="eos-icons:bubble-loading"
                          width={20}
                          height={20}
                        />{" "}
                        PROCESSING...
                      </>
                    ) : (
                      "CONFIRM"
                    )}
                  </button>
                )}
              {item.confirm_member.length >=
                Number(groupInfor?.requiredconfirmnumber) && (
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
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default ConfirmCard;
