"use client";

import { getRecords } from "@/lib/handleApi";
import { Reservations } from "@/types";
import { useEffect, useState } from "react";
import { Title } from "../Title";
import ReservationCard from "./ReservationCard";
import NoResult from "../NoResult";

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
      <NoResult
        title="No reservations found"
        description="We couldn't find any reservations"
      />
    );
  }

  return (
    <section className="mt-8 w-full">
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
