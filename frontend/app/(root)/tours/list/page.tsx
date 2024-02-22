"use client";

import { LinkComponent } from "@/components/Button";
import { IconPlus } from "@/components/Icons";
import Loading from "@/components/Loading";
import NoResult from "@/components/NoResult";
import { Title } from "@/components/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ToursTable from "@/components/tours/ToursTable";
import { AuthContext } from "@/context/AuthContext";
import { getRecords } from "@/lib/handleApi";
import { filtersToStringServer } from "@/lib/utils";
import { SearchParamsProps, Tour } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

const getTours = async (searchParams: {
  [key: string]: string | undefined;
}) => {
  if (searchParams.duration) {
    const value = searchParams.duration;
    delete searchParams.duration;

    if (value === "1") {
      searchParams["duration[lte]"] = "7";
    } else if (value === "2") {
      searchParams["duration[gte]"] = "7";
      searchParams["duration[lte]"] = "14";
    } else if (value === "3") {
      searchParams["duration[gte]"] = "14";
      searchParams["duration[lte]"] = "21";
    } else {
      searchParams["duration[gte]"] = "21";
    }
  }

  const tourList = await getRecords(
    "/tours?" + (searchParams ? filtersToStringServer(searchParams) : ""),
  );
  return tourList;
};

export default function TourListPage({ searchParams }: SearchParamsProps) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [data, setData] = useState<Tour[]>([]);

  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    const fetchData = async () => {
      const stats = await getTours(searchParams);
      setData(stats);
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center">
        <Title as="h1">Tours Stats by Difficulty</Title>
        <LinkComponent
          href="/tours/create"
          className="ml-auto flex !w-fit items-center"
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Create Tour
        </LinkComponent>
      </div>
      <div className="overflow-x-auto">
        <ToursTable tours={data} />
      </div>
    </DashboardLayout>
  );
}
