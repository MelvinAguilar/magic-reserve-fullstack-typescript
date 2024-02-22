"use client";

import Loading from "@/components/Loading";
import { Title } from "@/components/Title";
import { GenericCard } from "@/components/cards/GenericCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getRecords } from "@/lib/handleApi";
import { formatPrice } from "@/lib/utils";
import { Stats } from "@/types";
import { redirect } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const Page = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [data, setData] = useState<Stats>();
  
  useLayoutEffect(() => {
    if (!loading && !isAuthenticated(["admin"])) {
      redirect("/unauthorized");
    }
  }, [isAuthenticated, loading]);
  
  useEffect(() => {
    const fetchData = async () => {
      const stats = await getRecords("/tours/stats");
      setData(stats);
    };
    
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <DashboardLayout>
      <section>
        <Title as="h2" className="mb-6">
          Reservation stats
        </Title>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1fr,2fr,1fr]">
          <GenericCard className="flex w-full flex-col-reverse gap-4 bg-white">
            <Title as="h3" className="mb-4" small>
              Reservations
            </Title>
            <Title as="p" className="text-blue-600" large>
              {data?.reservationsStats?.totalReservations}
            </Title>
          </GenericCard>
          <GenericCard className="flex w-full flex-col-reverse gap-4 bg-white">
            <Title as="h3" className="mb-4" small>
              Max Spent
            </Title>
            <Title as="p" className="break-words text-blue-600" large>
              {formatPrice(data?.reservationsStats?.maxSpent || 0)}
            </Title>
          </GenericCard>
          <GenericCard className="flex w-full flex-col-reverse gap-4 bg-white">
            <Title as="h3" className="mb-4" small>
              Tickets Sold
            </Title>
            <Title as="p" className="text-blue-600" large>
              {data?.toursStats?.totalReservations}
            </Title>
          </GenericCard>
        </div>
      </section>

      <section>
        <Title as="h2" className="mb-6 mt-12">
          General stats
        </Title>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GenericCard className="flex w-full flex-col-reverse gap-4 bg-white">
            <Title as="h3" className="mb-4" small>
              Users
            </Title>
            <Title as="p" className="text-blue-600" large>
              {data?.toursStats?.totalUsers}
            </Title>
          </GenericCard>
          <GenericCard className="flex w-full flex-col-reverse gap-4 bg-white">
            <Title as="h3" className="mb-4" small>
              Tours
            </Title>
            <Title as="p" className="text-blue-600" large>
              {data?.toursStats?.totalTours}
            </Title>
          </GenericCard>
          <GenericCard className="flex w-full flex-col-reverse gap-4 bg-white">
            <Title as="h3" className="mb-4" small>
              Comments
            </Title>
            <Title as="p" className="text-blue-600" large>
              {data?.toursStats?.totalComments}
            </Title>
          </GenericCard>
        </div>
      </section>

      <section>
        <Title as="h2" className="mb-6 mt-12">
          Tours stats by difficulty
        </Title>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.difficultyStats?.map((item) => (
            <GenericCard key={item._id} className="w-full bg-white">
              <Title as="h3" className="mb-4 text-blue-600">
                {item._id.charAt(0).toUpperCase() + item._id.slice(1)}
              </Title>
              <p>
                Number of Tours:{" "}
                <span className="font-bold text-blue-600">{item.numTours}</span>
              </p>
              <p>
                Average Price:{" "}
                <span className="font-bold text-blue-600">
                  {formatPrice(item.avgPrice)}
                </span>
              </p>
              <p>
                Average Rating:{" "}
                <span className="font-bold text-blue-600">
                  {item.avgRating}
                </span>
              </p>
              <p>
                Number of Ratings:{" "}
                <span className="font-bold text-blue-600">
                  {item.numRatings}
                </span>
              </p>
            </GenericCard>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Page;
