import { useEffect, useState } from "react";
import useActiveWeb3 from "../useActiveWeb3";
import { Contract, ContractInterface } from "ethers";

export default function useContract(
  contractAddress: string | null,
  abi: ContractInterface
): Contract | null {
  const { signer } = useActiveWeb3();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (signer && contractAddress) {
      setContract(new Contract(contractAddress, abi, signer));
    }
  }, [signer, contractAddress, abi]);

  return contract;
}
