"use client";

import UsersTable from "@/components/users/UsersTable";
import { AuthContext } from "@/context/AuthContext";
import { SearchParamsProps } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

const getUsers = async (searchParams: {
  [key: string]: string | undefined;
}) => {
  const token = localStorage.getItem("session");

  const res = await fetch(`/api/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error getting users");
      }
      return res.json();
    })
    .then((data) => {
      if (data?.status === "success") {
        return data;
      } else {
        throw new Error("Error getting users: " + data?.message);
      }
    })
    .catch((err) => {
      toast.error(err.message);
      return [];
    });

  return res?.data || [];
};

export default function UsersPage({ searchParams }: SearchParamsProps) {
  const [data, setData] = useState([]);
  const { isAuthenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers(searchParams);
      setData(users || []);
    };

    fetchData();
  }, [searchParams]);

  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div className="p-8 pt-20">
        <h1>No users found</h1>
      </div>
    );
  }

  return (
    <div className="p-8 pt-20">
      <UsersTable users={data} />
    </div>
  );
}
