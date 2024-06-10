import { useEffect, useState } from "react";
import { Contract } from "ethers";
import USDC_ABI from "@/constants/usdc.json";
import useContract from "./useContract";

export type ERC20Data = {
  contract: Contract | null;
  symbol: string | null;
  decimals: number | null;
};

export default function useERC20(contractAddress: string | null): ERC20Data {
  const contract = useContract(contractAddress, USDC_ABI);
  const [data, setData] = useState<ERC20Data>({
    contract,
    symbol: null,
    decimals: null,
  });

  useEffect(() => {
    const loadData = async () => {
      if (!contract) return;
      const [symbol, decimals] = await Promise.all([
        contract.symbol(),
        contract.decimals(),
      ]);
      setData({ contract, symbol, decimals:Math.pow(10,decimals) });
    };
    loadData();
  }, [contract]);

  return data;
}
