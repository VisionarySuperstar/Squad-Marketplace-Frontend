import { useEffect, useState } from "react";
import useActiveWeb3 from "../useActiveWeb3";
import useERC20, { ERC20Data } from "./useERC20";
import { USDC_ADDRESS } from "@/constants/config";

export function useUSDC(): ERC20Data {
  const { chainId } = useActiveWeb3();
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const usdcContract = useERC20(contractAddress);
  useEffect(() => {
    if (chainId) {
      setContractAddress(USDC_ADDRESS[chainId]);
    }
  }, [chainId]);
  return usdcContract;
}
