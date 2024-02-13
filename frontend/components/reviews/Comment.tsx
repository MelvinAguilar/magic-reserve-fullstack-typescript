"use client";

import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import { StarFilledIcon } from "../Icons";

interface CommentProps {
  userId?: string;
  id: string;
  review: string;
  rating: number;
  tour: string;
  user: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
  handleOpenModal: () => void;
  handleUpdate: () => void;
}

const Comment = ({
  userId,
  review,
  rating,
  tour,
  user,
  createdAt,
  updatedAt,
  id,
  handleOpenModal,
  handleUpdate,
}: CommentProps) => {

  return (
    <div className="flex space-x-4 rounded-lg bg-light p-6 shadow-sm">
      <div className="shrink-0">
        {user.image ? (
          <Image
            className="size-10 rounded-full"
            src={user.image}
            alt={user.name}
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-300">
            <p>{user.name[0]}</p>
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="mb-4 text-sm text-gray-500">{getTimestamp(updatedAt)}</p>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <StarFilledIcon
              key={i}
              className={`size-6 ${
                rating > i ? "text-yellow-300" : "text-primary"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        <p className="break-normal">{review}</p>
      </div>

      {userId && userId === user._id && (
        <>
          <div className="shrink-0">
            <button
              onClick={handleUpdate}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Edit
            </button>
          </div>
          <span aria-hidden="true">|</span>
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleOpenModal}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
