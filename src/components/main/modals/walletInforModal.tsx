"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { IMGBB_API_KEY } from "@/constants/config";
import InputInfo from "@/components/main/infoInput";
import useAPI from "@/hooks/useAPI";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "@/store/user";
import toast from "react-hot-toast";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import { useBalance, useAccount, useChainId } from "wagmi";
import { useConnectModal, useChainModal } from "@rainbow-me/rainbowkit";
import AddFundIcon from "@/components/svgs/addFund_icon";
import Split_line from "../split_line";
import { useDisconnect } from "wagmi";
import { USDC_ADDRESS } from "@/constants/config";
import USDC_ABI from "@/constants/usdc.json";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import { Contract } from "ethers";
import { darkTheme, lightTheme, Theme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";

const WalletInforModal = () => {
  const { signUp, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const api = useAPI();
  const [step, setStep] = useState<number>(0);
  const [usdcBalance, setUSDCBalance] = useState<String>("");

  const { address, chainId, signer, chain, provider } = useActiveWeb3();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );
  React.useEffect(() => {
    if (!address || !chainId || !signer) {
      return;
    }
    // if (chainId !== 11155111) return;
    const _contract = new Contract(USDC_ADDRESS[chainId], USDC_ABI, signer);
    setContract(_contract);
  }, [address, chainId, signer]);
  const getUSDCBalance = async () => {
    if (!contract) return;
    const value = await contract.balanceOf(address);
    let decimal = 1e6;
    if (chainID === 11155111) decimal = 1e18;
    const displayingValue = (Number(value) / decimal).toFixed(2);
    console.log("displayingValue", displayingValue);
    setUSDCBalance(displayingValue.toString());
  };
  React.useEffect(() => {
    getUSDCBalance();
  }, [contract]);

  const walletInforModalState = useNavbarUIControlStore(
    (state) => state.walletInforModalState
  );
  const setWalletInforModalState = useNavbarUIControlStore(
    (state) => state.updateWalletInforModalState
  );
  function formatWalletAddress(address: string) {
    if (!address) return;
    // Extract the first 6 characters
    const start = address.substring(0, 6);

    // Extract the last 4 characters
    const end = address.substring(address.length - 4);

    // Combine the start, middle, and end parts
    const formattedAddress = `${start}...${end}`;

    return formattedAddress;
  }
  const chainID = useChainId();
  const chainName =
    chainID === 1
      ? "Ethereum"
      : chainID === 11155111
      ? "Sepolia"
      : chainID === 137
      ? "Polygon"
      : "";
  const { openChainModal } = useChainModal();
  const handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const { disconnect } = useDisconnect();

  const handleDisconnect = async () => {
    disconnect();
    window.localStorage.removeItem("accessToken");
    setWalletInforModalState(false);
  };
  const moonpayModalState = useNavbarUIControlStore(
    (state) => state.moonpayModalState
  );
  const setMoonpayModalState = useNavbarUIControlStore(
    (state) => state.updateMoonpayModalState
  );
  let darkMode = false;

  return (
    <>
      {walletInforModalState && (
        <div className="z-100 font-Maxeville">
          <div
            className="bg-chocolate-main/50 w-[100vw] h-[100vh] fixed top-0 z-[1000]"
            onClick={() => {
              setWalletInforModalState(false);
            }}
          ></div>
          <div className="generalModal1 z-[1300] drop-shadow-lg rounded-xl  ">
            <div
              className={`rounded-xl flex flex-col  text-[#141416] dark:text-[#FAFCFF] pb-5 `}
            >
              {step !== 1 && (
                <div className="bg-[#F6F6F6] pb-5 rounded-xl">
                  <div className="flex justify-between gap-2  h-[100px] p-2 pt-4 pb-4">
                    <div className="flex gap-3 justify-center items-center p-4 hover:bg-[#E3E3E3] rounded-xl hover:cursor-pointer">
                      <img src="/metamask.svg"></img>
                      {user && (
                        <>
                          <div
                            className=" text-ellipsis max-w-[150px] overflow-hidden"
                            onClick={() => handleCopyClick(user?.wallet)}
                          >
                            {formatWalletAddress(user?.wallet)}
                          </div>
                        </>
                      )}
                    </div>
                    {openChainModal && (
                      <div
                        className="flex justify-center items-center rounded-xl p-4 hover:bg-[#E3E3E3] hover:cursor-pointer gap-3"
                        onClick={() => openChainModal()}
                      >
                        {chainID !== 137 && (
                          <Icon
                            icon="logos:ethereum"
                            className="w-[24px] h-[24px]"
                          />
                        )}
                        {chainID === 137 && (
                          <Icon
                            icon="devicon:polygon"
                            className="w-[24px] h-[24px]"
                          />
                        )}
                        {chainName}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col pl-7 gap-2">
                    <div className="font-medium text-xl">
                      ${usdcBalance ? usdcBalance : "0.00"} USDC
                    </div>
                    <div className="text-lg text-gray-400">Wallet balance</div>
                  </div>
                </div>
              )}
              {!step && (
                <>
                  <div className="flex flex-col items-center justify-center p-5 gap-5">
                    <AddFundIcon />
                    <div className="text-xl font-medium text-center">
                      Fund your wallet
                    </div>
                    <div className="text-xl font-medium text-center -mt-5">
                      to Purchase NFT
                    </div>
                    <button
                      className="w-2/3 bg-[#322A44] rounded-full text-white h-[30px] text-center flex items-center justify-center p-5"
                      onClick={() => {
                        setWalletInforModalState(false);
                        setMoonpayModalState(true);
                      }}
                    >
                      Add Funds with Cards
                    </button>
                  </div>
                </>
              )}
              {step === 1 &&
                (chainID !== 11155111 ? (
                  <>
                    <div className="flex flex-col items-center justify-center h-[570px]">
                      <SwapWidget
                        tokenList={"https://ipfs.io/ipns/tokens.uniswap.org"}
                        provider={provider}
                        hideConnectionUI={true}
                        theme={darkMode ? darkTheme : lightTheme}
                        defaultOutputTokenAddress={{
                          [chainID]: USDC_ADDRESS[chainID],
                        }}
                        brandedFooter={false}
                        className="!border-none !w-full !h-full flex items-center justify-center"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-xl  font-semibold text-center text-red-400">
                    Do not support testnet
                  </div>
                ))}

              <div className="bg-white z-[1000] h-[100px]">
                <div className="fixed bottom-[80px] w-full ">
                  <Split_line />
                </div>
                <div className="flex items-center justify-around bottom-3 fixed w-full">
                  <div
                    className="flex flex-col gap-2 items-center justify-center hover:cursor-pointer "
                    onClick={() => setStep(0)}
                  >
                    {step ? (
                      <Icon
                        icon="solar:dollar-line-duotone"
                        className="w-[32px] h-[32px]"
                      />
                    ) : (
                      <Icon
                        icon="raphael:dollar"
                        className="w-[32px] h-[32px]"
                      />
                    )}
                    <h1>Crypto</h1>
                  </div>
                  <div
                    className="flex flex-col gap-2 items-center justify-center hover:cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    {step === 1 ? (
                      <Icon
                        icon="ic:round-swap-horizontal-circle"
                        className="w-[32px] h-[32px]"
                      />
                    ) : (
                      <Icon
                        icon="ic:outline-swap-horizontal-circle"
                        className="w-[32px] h-[32px]"
                      />
                    )}

                    <h1>Swap</h1>
                  </div>
                  <div
                    className="flex flex-col gap-2 items-center justify-center hover:cursor-pointer"
                    onClick={() => {
                      handleDisconnect();
                    }}
                  >
                    <Icon
                      icon="material-symbols:logout-sharp"
                      className="w-[32px] h-[32px]"
                    />
                    <h1>Disconnect</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default WalletInforModal;
