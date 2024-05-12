"use client";
import React from "react";
import { type Chain, type Address, type Client } from "viem";
import { useSignMessage } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import useActiveWeb3 from "@/hooks/useActiveWeb3";
import axios from "axios";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userAtom } from "@/store/user";
import { IUSER, TRegister, IGROUP } from "@/types";
import { TMsg } from "@/types/user";
import jwt from "jsonwebtoken";

import { useRouter } from "next/navigation";
import useAPI from "@/hooks/useAPI";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import toast from "react-hot-toast";

interface IContext {
  signIn: () => Promise<void>;
  signUp: (data: TRegister) => Promise<void>;
  isAuthenticated: boolean;
  user: IUSER | undefined;
}

export const AuthContext = React.createContext<IContext | undefined>(undefined);

const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  //hooks
  const {
    address,
    chain,
    signer,
    isConnected,
    isConnecting,
    isReconnecting,
    connector,
    isDisconnected,
    chainId,
  } = useActiveWeb3();
  const { signMessageAsync } = useSignMessage();

  const api = useAPI();
  const router = useRouter();
  //atoms
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const setProfileModalState = useGroupUIControlStore(
    (state) => state.updateProfileModal
  );

  const _setAuth = (user: IUSER | undefined, token: string | undefined) => {
    axios.defaults.headers.common["x-auth-token"] = token;
    setIsAuthenticated(true);
    console.log("_setAuth user", user);
    setUser(user);
  };
  //disconnect
  React.useEffect(() => {
    if (isDisconnected) {
      setUser(undefined);
      setIsAuthenticated(false);
      router.push("/groups");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected]);

  const signIn = async () => {
    try {
      if (!chain) throw "chain is not defined...";
      if (!address) throw "address is not defined...";

      const response = await api
        .post(`/auth/user/request-message`, {
          chain: 1,
          address,
        })
        .catch((error) => {
          toast.error(error.message);
        });
      const { id, message, profileId }: TMsg = response?.data;

      if (!id || !message || !profileId) {
        toast.error("Undefined Message.");
        return;
      }

      const signature = await signMessageAsync({ message }).catch((error) => {
        toast.error(error.message);
      });

      const result_signdata = await api
        .post(`/auth/user/signin`, {
          message,
          signature,
        })
        .catch((error) => {
          toast.error(error.message);
        });
      const signData = result_signdata?.data;

      if (signData === "NONE") {
        _setAuth(undefined, undefined);
        setProfileModalState(true);
        // router.push("/profile/create")

        toast.success("Please create your profile.");
      } else {
        window.localStorage.setItem("accessToken", signData);
        const { data: _user }: any = jwt.decode(signData);
        console.log("_user->", _user);
        _setAuth(_user, signData);
        toast.success("Signin Success");
      }
      return signData;
    } catch (err: any) {
      if (err.code === 4001) {
        toast.error("User rejected the request.");
      } else if (err.code === "ERR_BAD_RESPONSE") {
        toast.error("Signin failed. Please try again.");
      }
    }
  };

  const verifyUser = async () => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      const response = await api
        .post("/auth/user/verifyuser", {
          accessToken,
        })
        .catch((error) => {
          toast.error(
            "Your profile cannot be found or your access time has expired. Try logging in again."
          );
          signIn();
        });
      const token = response?.data;
      const result: any = jwt.decode(token);
      if (result?.data) {
        _setAuth(result?.data, token);
        toast.success("Signin Success");
      }
    } else {
      signIn();
    }
  };

  const signUp = async (user: TRegister) => {
    try {
      if (!chainId) throw "chain is not defined...";
      if (!address) throw "address is not defined...";

      const response_messageData = await api
        .post(`/auth/user/request-message`, {
          chain: chainId,
          address,
        })
        .catch((error) => {
          toast.error(error.message);
        });
      const msgData = response_messageData?.data;
      const { id, message, profileId }: TMsg = msgData;
      if (!id || !message || !profileId) {
        toast.error("Undefined Message.");
        return;
      }
      const signature = await signMessageAsync({ message });
      const response = await api
        .post(`/auth/user/signup`, {
          message,
          signature,
          user,
        })
        .catch((error) => {
          toast.error(error.message);
        });
      const registerData = response?.data;

      if (registerData === "exists") {
        toast.error("User already exists.");
      } else {
        const result: any = jwt.decode(registerData);
        console.log(result?.data);
        _setAuth(result?.data, registerData);
        toast.success("Profile created Successfully.");
      }
    } catch (err: any) {
      console.log(err);
      if (err.code === 4001) {
        toast.error("User rejected the request.");
      } else if (
        err.code === "ERR_BAD_RESPONSE" ||
        err.code === "ERR_NETWORK"
      ) {
        toast.error("Register failed. Please try again.");
      }
    }
  };

  React.useEffect(() => {
    if (isConnected) {
      //
      verifyUser();
    } else {
      setUser(undefined);
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chain, address]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
