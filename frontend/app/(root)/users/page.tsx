"use client";

import { Title } from "@/components/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UsersTable from "@/components/users/UsersTable";
import { AuthContext } from "@/context/AuthContext";
import { getRecords } from "@/lib/handleApi";
import { SearchParamsProps } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

export default function UsersPage({ searchParams }: SearchParamsProps) {
  const [data, setData] = useState([]);
  const { isAuthenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getRecords("/users");
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
    <DashboardLayout>
      <Title as="h1" className="mb-8">
        Users List
      </Title>
      <UsersTable users={data} />
    </DashboardLayout>
  );
}
