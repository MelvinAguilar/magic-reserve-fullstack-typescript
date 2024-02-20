"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tours/Table";
import { Reservation } from "@/types";
import Image from "next/image";
import React from "react";

interface ReservationsTableProps {
  reservations: Reservation[];
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Tour</TableHeader>
            <TableHeader>Guides</TableHeader>
            <TableHeader>Slots</TableHeader>
            <TableHeader>Subtotal</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Updated At</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <React.Fragment key={reservation.id}>
              <TableRow>
                <TableCell>{reservation.tours[0]?.tour.name}</TableCell>
                <TableCell>
                  {reservation.tours[0] && reservation.tours[0].tour.guides.map((guide: any) => (
                    <div key={guide._id} className="flex items-center gap-2">
                      <Image
                        src={guide.photo}
                        alt={guide.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p>{guide.name}</p>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{reservation.tours[0]?.quantity}</TableCell>
                <TableCell>${reservation.tours[0]?.subtotal}</TableCell>
                <TableCell>${reservation.total}</TableCell>
                <TableCell>
                  {new Date(reservation.createdAt).toDateString()}
                </TableCell>
                <TableCell>
                  {new Date(reservation.updatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ReservationsTable;
