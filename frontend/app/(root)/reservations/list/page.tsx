"use client";

import { Title } from "@/components/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReservationsTable from "@/components/reservations/ReservationsTable";
import { AuthContext } from "@/context/AuthContext";
import { getRecords } from "@/lib/handleApi";
import { Reservation, SearchParamsProps } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

export default function ReservationsPage({ searchParams }: SearchParamsProps) {
  const [data, setData] = useState<Reservation[]>([]);
  const { isAuthenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const reservations:Reservation[] = await getRecords("/reservations");
      setData(reservations);
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
        <h1>No Reservations found</h1>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Title as="h1" className="mb-8">
        Reservations List
      </Title>
      <ReservationsTable reservations={data} />
    </DashboardLayout>
  );
}
