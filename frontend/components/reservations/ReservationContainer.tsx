"use client";

import { getRecords } from "@/lib/handleApi";
import { Reservations } from "@/types";
import { useEffect, useState } from "react";
import { Title } from "../Title";
import ReservationCard from "./ReservationCard";

export default function ReservationContainer() {
  const [data, setData] = useState<Reservations[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getRecords("/reservations/my-reservations/");
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
