"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tours/Table";
import useModalClose from "@/hook/useModalClose";
import { handleApi } from "@/lib/handleApi";
import { Tour } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Modal from "../Modal";
import RatingStars from "../reviews/RatingStars";
import NoResult from "../NoResult";

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
  tours: Tour[];
}

const ToursTable = ({ tours }: ToursTableProps) => {
  const router = useRouter();

  const [showMenuForTour, setShowMenuForTour] = useState<string | null>(null);

  useModalClose(() => setShowMenuForTour(null), ".dropdown");

  const toggleMenuForTour = (tourId: string) => {
    if (showMenuForTour === tourId) {
      setShowMenuForTour(null);
    } else {
      setShowMenuForTour(tourId);
    }
  };

  const handleDeleteOption = (id: string) => {
    setModalOpen(true);
    setSelectedTour(id);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTour(null);
  };

  const handleConfirm = () => {
    if (!selectedTour) return;
    deleteTour(selectedTour);
    setModalOpen(false);
    setSelectedTour(null);
  };

  const deleteTour = async (id: string) => {
    await handleApi(`/tours/${id}`, "DELETE").then((data) => {
      if (data?.status === "success") {
        toast.success("Tour deleted");
        router.refresh();
      }
    });
  };

  if (!tours) {
    return (
      <NoResult
        title="No tours found"
        description="We couldn't find any tours"
      />
    );
  }

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
                    <RatingStars
                      rating={tour.ratingsAverage}
                      quantity={tour.ratingsQuantity}
                      small
                    />
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
