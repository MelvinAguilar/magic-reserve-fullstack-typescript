"use client";

import fetchData, { postData } from "@/lib/apiUtils";
import { User } from "@/types";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: (roles: string[]) => boolean;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: () => false,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = getCookie("session");
        if (token && token !== "undefined") {
          const data = await fetchData("/users/me");
          setUser(data.data);
        }
      } catch (error) {
        toast.error((error as Error).message);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await postData("/users/login", { email, password });
      const response = data.data;

      const user = response.data.user;
      const token = response.token;

      setCookie("session", token);
      setUser(user);

      toast.success("Welcome back!");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await postData("/users/signup", { name, email, password });
      const user = data.data.data.user;
      setUser(user);

      toast.success("Welcome!");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  const logout = () => {
    deleteCookie("session");
    setUser(null);
  };

  const isAuthenticated = (roles: string[]) => {
    if (!user) {
      return false;
    }

    if (roles.includes(user.role)) {
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
