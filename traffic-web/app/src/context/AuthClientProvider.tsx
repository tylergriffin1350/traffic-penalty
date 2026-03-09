"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserSignInResponse } from "@/types/apiAuthResponse";
import { useRouter, usePathname } from "next/navigation";
import jwt from "jsonwebtoken";
import { axiosPublic, setupAxiosInterceptors } from "@/lib/axios";
import {
  getCookie,
  removeCookie,
  setCookieWithExpiration,
} from "@/lib/cookies";
import { AuthContextType } from "@/types/authContext";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserSignInResponse | null>(null);
  const [token, setToken] = useState<string | undefined | null>(null);
  const [avatar, setAvatar] = useState<string>("/cheche/cheche.svg");

  const refreshAuthToken = async () => {
    try {
      const refreshToken = getCookie("refresh_token");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axiosPublic.post("/api/v1/auth/refresh", {
        refreshToken,
      });

      if (response.status === 200 && response.data) {
        const {
          accessToken,
          refreshToken: newRefreshToken,
          user: refreshedUser,
        } = response.data;

        setCookieWithExpiration("token", accessToken, 1);
        setCookieWithExpiration("refresh_token", newRefreshToken, 1);

        setToken(accessToken);
        setUser(refreshedUser);
      }
    } catch (error) {
      toast.error("Token refresh failed");
      SignOut();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setupAxiosInterceptors(refreshAuthToken);

      const tokenFromCookie = getCookie("token");
      const userFromCookie = getCookie("user");

      if (tokenFromCookie && userFromCookie) {
        try {
          const parsedUser = JSON.parse(userFromCookie) as UserSignInResponse;
          setToken(tokenFromCookie);
          setUser(parsedUser);
        } catch (e) {
          console.error("Failed to parse user from cookie:", e);
          SignOut();
        }
      } else {
        const exception_paths = ["/", "/sign-in"];
        if (!exception_paths.includes(pathname)) {
          SignOut();
        }
      }
    }
  }, []);

  const SignOut = () => {
    removeCookie("token");
    removeCookie("refresh_token");
    removeCookie("user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setCookieWithExpiration,
        setToken,
        SignOut,
        avatar,
        setAvatar,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthClientProvider");
  }
  return context;
};
