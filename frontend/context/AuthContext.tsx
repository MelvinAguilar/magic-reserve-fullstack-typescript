"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/types";

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
    const fetchData = async () => {
      const token = localStorage.getItem("session");

      if (token && token !== "undefined") {
        setLoading(true);

        await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return null;
          })
          .then((data) => {
            if (data?.status === "success") {
              const user = data.data;
              setUser(user);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };

    fetchData();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();

      if (data?.status === "success") {
        const responseData = data.data;
        localStorage.setItem("session", responseData.token);

        const user = responseData.data.user;
        setUser(user);

        toast.success("Welcome back!");
        router.push("/");
      } else {
        toast.error(data?.message || "Error in login");
      }
    } else {
      toast.error("Error in login");
    }

    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.status === "success") {
        const responseData = data.data;
        localStorage.setItem("session", responseData.token);

        const user = responseData.data.user;
        setUser(user);

        toast.success("Welcome!");
        router.push("/");
      } else {
        toast.error(data?.message || "Error in register");
      }
    } else {
      toast.error("Error in register");
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("session");
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
