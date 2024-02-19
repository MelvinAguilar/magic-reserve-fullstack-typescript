"use client";

import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import { GenericCard } from "@/components/cards/GenericCard";
import SideBar from "@/components/dashboard/Sidebar";
import { formatPrice } from "@/lib/utils";
import { Stats } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const getStats = async () => {
  const token = localStorage.getItem("session");

  const res = await fetch(`/api/tours/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error getting stats ");
      }
      return res.json();
    })
    .then((data) => {
      if (data?.status === "success") {
        return data;
      } else {
        throw new Error("Error getting stats: " + data?.message);
      }
    })
    .catch((err) => {
      toast.error(err.message);
      return [];
    });

  return res?.data || [];
};

const Page = () => {
  const [data, setData] = useState<Stats>();
  useEffect(() => {
    const fetchData = async () => {
      const stats = await getStats();
      setData(stats);
    };

    fetchData();
  }, []);

  return (
    <div className="grid flex-1 grid-cols-[220px,1fr]">
      <SideBar />

      <Container className="mt-20 p-8">
        <section>
          <Title as="h2" className="mb-6">
            Reservations Stats
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
              <Title as="p" className="text-blue-600 break-words" large>
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
            Tours Stats
          </Title>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                Reservations
              </Title>
              <Title as="p" className="text-blue-600" large>
                {data?.toursStats?.totalReservations}
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
            Tours Stats by Difficulty
          </Title>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.difficultyStats?.map((item) => (
              <GenericCard key={item._id} className="w-full bg-white">
                <Title as="h3" className="mb-4 text-blue-600">
                  {item._id.charAt(0).toUpperCase() + item._id.slice(1)}
                </Title>
                <p>
                  Number of Tours:{" "}
                   <span className="text-blue-600 font-bold">{item.numTours}</span>
                </p>
                <p>
                  Average Price:{" "}
                   <span className="text-blue-600 font-bold">
                    {formatPrice(item.avgPrice)}
                  </span>
                </p>
                <p>
                  Average Rating:{" "}
                   <span className="text-blue-600 font-bold">{item.avgRating}</span>
                </p>
                <p>
                  Number of Ratings:{" "}
                   <span className="text-blue-600 font-bold">{item.numRatings}</span>
                </p>
              </GenericCard>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Page;
