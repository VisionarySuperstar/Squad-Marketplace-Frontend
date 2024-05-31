import React from "react";
import axios, { AxiosError } from "axios";
import useAuth from "./useAuth";
import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/store/user";
import { useRouter } from "next/navigation";
import { baseURL } from "@/constants/config";

const useAPI = () => {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const api = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      if (err.response?.status === 401) {
        axios.defaults.headers.common["x-auth-token"] = undefined;
        setUser(undefined);
        setIsAuthenticated(false);
        // router.push("/groups");
      }
      if (err.response?.status === 404) {
        console.log("Not found");
      }
      if (err.response?.status === 500) {
        console.log("Backend is not running");
      }
      if (err?.message === "Network Error") {
        console.log("Network Error: Please check your network connection");
      }
      return Promise.reject(err);
    }
  );

  return api;
};

export default useAPI;
