"use client";

import UsersTable from "@/components/users/UsersTable";
import { SearchParamsProps } from "@/types";
import { useEffect, useState } from "react";
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
        throw new Error(
          "Error getting users: " + res.status + " - " + res.statusText,
        );
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

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers(searchParams);
      setData(users || []);
    };

    fetchData();
  }, [searchParams]);


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
