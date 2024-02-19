import { formatPrice } from "@/lib/utils";
import { Reservations } from "@/types";
import Image from "next/image";
import React from "react";
import { GenericCard } from "../cards/GenericCard";

const ReservationCard = ({ reservations }: { reservations: Reservations }) => {
  return (
    <GenericCard as="ul" className="w-full">
      <li className="flex">
        <div className="flex flex-col w-full">
          {reservations.tours.map((tour) => (
            <div
              key={tour.tour.id}
              className={`flex flex-1 items-start space-x-4 ${
                reservations.tours.indexOf(tour) !== reservations.tours.length - 1
                  ? "pb-4 mb-4 border-b border-gray-500"
                  : ""
              }`}
            >
              <Image
                src={tour.tour.imageCover}
                alt={tour.tour.name}
                width={96}
                height={96}
                quality={65}
                className="aspect-square size-24 flex-none rounded-md border border-gray-200 object-cover"
              />
              <div className="flex-auto space-y-1">
                <h3>{tour.tour.name}</h3>
                <p> Unit price: {formatPrice(tour.unitPrice)}</p>
                <p> Quantity: {tour.quantity}</p>
                <p className="flex-none text-base font-medium">
                  {formatPrice(tour.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p>Total: {formatPrice(reservations.total)}</p>
      </li>
    </GenericCard>
  );
};

export default ReservationCard;
