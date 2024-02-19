"use client";

import { Reservations } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Title } from "../Title";
import ReservationCard from "./ReservationCard";

const getReservations = async () => {
  const token = localStorage.getItem("session");

  const res = await fetch(`/api/reservations`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error getting reservations");
      }
      return res.json();
    })
    .then((data) => {
      if (data?.status === "success") {
        return data;
      } else {
        throw new Error("Error getting reservations: " + data?.message);
      }
    })
    .catch((err) => {
      toast.error(err.message);
      return [];
    });

  return res?.data || [];
};

export default function ReservationContainer() {
  const [data, setData] = useState<Reservations[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getReservations();
      setData(users || []);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="p-8 pt-20">
        <h2> No data found</h2>
      </div>
    );
  }

  return (
    <section className="w-full mt-8">
      <Title className="text-2xl font-bold">
        Reservations &mdash; {data.length}
      </Title>
      <div className="mt-8 grid gap-4">
        {data.map((reservation) => (
          <ReservationCard key={reservation.id} reservations={reservation} />
        ))}
      </div>
    </section>
  );
}
