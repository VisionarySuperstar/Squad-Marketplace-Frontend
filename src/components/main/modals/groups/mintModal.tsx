"use client";
import React from "react";
import Image from "next/image";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import collectionData from "@/data/collections.json";
import mygroupsData from "@/data/mygroups.json";

interface MintModalInterface {
  groupId: number;
  uploadId: number;
}
const MintModal = ({ groupId, uploadId }: MintModalInterface) => {
  const setMintModalState = useGroupUIControlStore(
    (state) => state.updateMintModal
  );
  const [selected, setSelected] = React.useState<number>(0);
  const [step, setStep] = React.useState<number>(0);
  const [lastStep, setLastStep] = React.useState<number>(0);
  const handleNext = () => {
    setLastStep(step);
    if (!step) {
      if (selected === collectionData.length) setStep(1);
      else setStep(2);
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
  const [newCollectionSymbol, setNewCollectionSymbol] =
    React.useState<string>("");
  const [newCollectionDescription, setNewCollectionDescription] =
    React.useState<string>("");
  return (
    <>
      <div className="z-100 font-Maxeville text-chocolate-main">
        <div
          className="join_background"
          onClick={() => {
            setMintModalState(false);
          }}
        ></div>
        <div className="joinModal drop-shadow-lg p-[25px]">
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
                {collectionData.map((index, key) => (
                  <div
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`cursor-pointer  rounded-lg m-2 p-3 ${
                      selected === key ? "border border-chocolate-main/50" : ""
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {index.nfts.map((nfts, key1) => (
                        <div
                          key={key1}
                          className="flex items-center justify-center"
                        >
                          <Image
                            src={nfts.avatar}
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
                <div
                  onClick={() => setSelected(collectionData.length)}
                  className={`items-center justify-center flex cursor-pointer hover:opacity-85 hover:border ${
                    selected === collectionData.length ? "p-1" : "p-[20px]"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center bg-gray-400 h-[92%] md:h-[86%] w-full mb-5 sm:min-h-[100px]">
                    <h2>NEW COLLECTION</h2>
                    <h2 className="">+</h2>
                  </div>
                </div>
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
                    src="/temp.jpg"
                    className="w-full h-full aspect-square object-cover"
                    width={100}
                    height={100}
                    alt="uploaded content"
                  />
                </div>
              </div>
              <h2 className="text-left text-lg text-chocolate-main mt-5">
                MINTING TO
              </h2>
              {selected === collectionData.length ? (
                <div>
                  <h2 className="text-left text-lg text-chocolate-main mt-2">
                    COLLECTION NAME
                  </h2>
                  <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px] mt-2 w-1/2">
                    <input
                      value={newCollectionName}
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
                      value={newCollectionSymbol}
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
                    placeholder="Write a description..."
                    className="mt-2 outline-none border-2 border-black w-4/5 p-[10px] rounded-xl text-chocolate-main"
                    rows={4}
                  />
                </div>
              ) : (
                <div className="p-1 w-1/4 mt-5">
                  <div className="grid grid-cols-2 gap-2">
                    {collectionData[selected].nfts.map((nfts, key1) => (
                      <div
                        key={key1}
                        className="flex items-center justify-center"
                      >
                        <Image
                          src={nfts.avatar}
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
                    {collectionData[selected].name}
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
                  className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg"
                  onClick={handleNext}
                >
                  MINT
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
