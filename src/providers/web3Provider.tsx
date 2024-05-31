"use client";
import React from "react";
import { type Chain, type Address, type Client } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { providers } from "ethers";

function clientToSigner(client: any) {
  const { account, chain, transport } = client;
  if (!account || !chain || !transport) {
    return undefined;
  }
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}
function clientToProvider(client: any) {
  const { account, chain, transport } = client;
  if (!account || !chain || !transport) {
    return undefined;
  }
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  return provider;
}

interface IContext {
  chain: Chain | undefined;
  address: Address | undefined;
  chainId: number | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  isReconnecting: boolean;
  isDisconnected: boolean;
  connector: any | undefined;
  signer: any | undefined;
  provider:any | undefined;
}

export const Web3Context = React.createContext<IContext | undefined>(undefined);

const Web3ContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const {
    address,
    chain,
    isConnected,
    isConnecting,
    isReconnecting,
    connector,
    isDisconnected,
    chainId,
  } = useAccount();
  const { data } = useWalletClient({ chainId });
  const client: Client = data as Client;

  const provider = React.useMemo(
    () => (client ? clientToProvider(client) : undefined),
    [client]
  );
  const signer = React.useMemo(
    () => (client ? clientToSigner(client) : undefined),
    [client]
  );
  

  return (
    <Web3Context.Provider
      value={{
        chain,
        address,
        isConnected,
        isConnecting,
        isReconnecting,
        isDisconnected,
        connector,
        chainId,
        signer,
        provider
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
