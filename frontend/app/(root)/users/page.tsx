"use client";

import Loading from "@/components/Loading";
import NoResult from "@/components/NoResult";
import { Title } from "@/components/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UsersTable from "@/components/users/UsersTable";
import { AuthContext } from "@/context/AuthContext";
import { getRecords } from "@/lib/handleApi";
import { SearchParamsProps } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

export default function UsersPage({ searchParams }: SearchParamsProps) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [data, setData] = useState([]);

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

  if (loading) return <Loading />;

  if (!data)
    return (
      <NoResult
        title="No users found"
        description="We couldn't find any users"
      />
    );

  return (
    <DashboardLayout>
      <Title as="h1" className="mb-8">
        User List
      </Title>
      <div className="overflow-x-auto">
        <UsersTable users={data} />
      </div>
    </DashboardLayout>
  );
}
