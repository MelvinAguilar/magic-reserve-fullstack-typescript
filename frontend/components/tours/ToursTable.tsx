"use client";

import { Tour } from "@/types";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tours/Table";
import useModalClose from "@/hook/useModalClose";
import RatingStars from "../RatingStars";
import Modal from "../Modal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DifficultyLabelProps {
  difficulty: string;
}

const DifficultyLabel: React.FC<DifficultyLabelProps> = ({ difficulty }) => {
  let colorClass = "";
  let borderColorClass = "";
  let textClass = "";

  switch (difficulty) {
    case "easy":
      colorClass = "bg-green-500/20";
      borderColorClass = "border-green-600";
      textClass = "text-green-600";
      break;
    case "medium":
      colorClass = "bg-yellow-500/20";
      borderColorClass = "border-yellow-600";
      textClass = "text-yellow-600";

      break;
    case "difficult":
      colorClass = "bg-red-500/20";
      borderColorClass = "border-red-600";
      textClass = "text-red-600";
      break;
    default:
      colorClass = "bg-gray-500/20";
      borderColorClass = "border-gray-600";
      textClass = "text-gray-600";
      break;
  }

  return (
    <span
      className={`${textClass} ${colorClass} ${borderColorClass} inline-block rounded-full border-2 px-3 py-1 text-xs  font-semibold `}
    >
      {difficulty}
    </span>
  );
};

interface ToursTableProps {
  tours: Tour[]; // Propiedad para pasar el array de tours
}

const ToursTable = ({ tours }: ToursTableProps) => {
  const router = useRouter();

  const [showMenuForTour, setShowMenuForTour] = useState<string | null>(null);

  useModalClose(() => setShowMenuForTour(null), ".dropdown");

  const toggleMenuForTour = (tourId: string) => {
    if (showMenuForTour === tourId) {
      setShowMenuForTour(null); // Oculta el menú si ya está visible para este tour
    } else {
      setShowMenuForTour(tourId); // Muestra el menú para este tour
    }
  };

  console.log("tours: d ", tours);

  //  Only console the slug of the all tours:
  tours.map((tour) => {
    console.log("tour.slug: ", tour.ratingsAverage);
  });

  const handleDeleteOption = (id: string) => {
    console.log("Delete tour with id: ", id);
    setModalOpen(true);
    setSelectedTour(id);
  };

  //   Modal component = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTour(null);
  };

  const handleConfirm = () => {
    console.log("Deleting tour: ", selectedTour);
    if (!selectedTour) return;
    deleteTour(selectedTour);
    setModalOpen(false);
    setSelectedTour(null);
  };

  const deleteTour = async (id: string) => {
    const token = localStorage.getItem("session");

    const response = await fetch(`/api/tours/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        console.log("RES: ", res);

        if (!res.ok) {
          throw new Error("Error deleting tour");
        }
        // if (res.ok) {
        //   return res.json();
        // }
        return res.json();
        // return null;
      })
      .then((data) => {
        console.log("DATA: ", data);
        if (data?.status === "success") {
          toast.success("Tour deleted");
          router.refresh();
        } else {
          toast.error("Error deleting tour: " + data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  if (!tours) return null;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Duration</TableHeader>
            <TableHeader>Difficulty</TableHeader>
            <TableHeader className="w-20">Price</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader className="w-12"></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tours.map((tour) => (
            <React.Fragment key={tour.id}>
              <TableRow>
                <TableCell>{tour.name}</TableCell>
                <TableCell>{tour.duration} days</TableCell>
                <TableCell>
                  <DifficultyLabel difficulty={tour.difficulty} />
                </TableCell>
                <TableCell>${tour.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={tour.ratingsAverage} small />
                    <p>({tour.ratingsQuantity})</p>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleMenuForTour(tour.id)}
                    className="dropdown absolute inset-0 w-full text-zinc-500"
                  >
                    &#8226;&#8226;&#8226;
                  </button>
                  {showMenuForTour === tour.id && (
                    <div className="dropdown absolute right-0 top-full z-10 mt-[1px] w-48 rounded-md border border-primary bg-white shadow-lg">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          href={`/tours/${tour.id}`}
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/tours/${tour.id}/edit`}
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          Edit Tour
                        </Link>
                        <button
                          onClick={() => handleDeleteOption(tour.id)}
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          Delete Tour
                        </button>
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Delete Tour"
        description="Are you sure you want to delete this tour?"
      />
    </>
  );
};

export default ToursTable;
