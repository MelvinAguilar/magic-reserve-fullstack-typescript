"use client";

import Input from "@/components/form/Input";
import { AuthContext } from "@/context/AuthContext";
import { handleApi } from "@/lib/handleApi";
import { ReviewSchema } from "@/validations/ReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { StarFilledIcon } from "../Icons";
import Modal from "../Modal";
import { Title } from "../Title";
import Comment from "./Comment";

interface ReviewsProps {
  reviews: any;
  id: string;
}

const Reviews = ({ reviews, id }: ReviewsProps) => {
  const router = useRouter();
  const [rating, setRating] = useState(-1);
  const { isAuthenticated, user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
  });

  const deleteComment = async (id: string) => {
    await handleApi(`/reviews/` + id, "DELETE").then((data) => {
      if (data?.status === "success") {
        toast.success("Review deleted");
        reset();
        setRating(-1);
        router.refresh();
      } else {
        toast.error("Error deleting review: " + data?.message);
      }
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof ReviewSchema>> = async (
    data,
  ) => {
    const method = isEditing ? "PATCH" : "POST";

    const body = isEditing
      ? {
          review: data.comment,
          rating: Number(data.rating),
          id: selectedCommentId,
        }
      : {
          review: data.comment,
          rating: Number(data.rating),
          tour: id,
          user: user?._id,
        };

    await handleApi(
      `/reviews/` + (isEditing ? selectedCommentId : ""),
      method,
      body,
    ).then((data) => {
      if (data?.status === "success") {
        toast.success(isEditing ? "Review updated" : "Review submitted");
        setIsEditing(false);
        setRating(-1);
        reset();
        setSelectedCommentId("");
        router.refresh();
      }
    });
  };

  // Default values for the form
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (id: string, comment: string, rating: number) => {
    setSelectedCommentId(id);
    setIsEditing(true);
    setRating(rating);
    setValue("comment", comment, { shouldValidate: true });
    setValue("rating", String(rating), { shouldValidate: true });
    setFocus("comment");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setRating(-1);
    setSelectedCommentId("");
    reset();
  };

  // Modal component
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState("");

  const handleOpenModal = (commentId: string) => () => {
    setModalOpen(true);
    setSelectedCommentId(commentId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCommentId("");
  };

  const handleConfirm = () => {
    deleteComment(selectedCommentId);
    setModalOpen(false);
    setSelectedCommentId("");
    reset();
  };

  return (
    <>
      <div>
        {isAuthenticated(["user", "admin"]) && (
          <>
            <Title className="mb-4 mt-8">Leave a review for this tour</Title>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mt-8 flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <label
                    key={i}
                    htmlFor={`rating-${i}`}
                    className="relative flex items-center justify-center"
                  >
                    <input
                      type="radio"
                      id={`rating-${i}`}
                      value={Number(i + 1)}
                      {...register("rating")}
                      className="absolute left-0 top-0 size-full cursor-pointer appearance-none"
                      onClick={() => setRating(i + 1)}
                      aria-describedby="rating-error"
                    />
                    <StarFilledIcon
                      className={`size-6 ${
                        rating > i ? "text-yellow-300" : "text-primary"
                      }`}
                      aria-hidden="true"
                    />
                  </label>
                ))}
                {rating > 0 && (
                  <p className="text-sm text-gray-500">
                    &mdash; You rated {rating} stars
                  </p>
                )}
              </div>
              <div aria-live="polite" aria-atomic="true">
                {errors && errors?.rating?.message && (
                  <p
                    id="rating-error"
                    role="alert"
                    className="mt-2 text-sm font-semibold text-red-500"
                  >
                    {errors.rating.message || ""}
                  </p>
                )}
              </div>
              <Input
                innerRef={register("comment")}
                name="Review"
                type="text"
                placeholder="Write your review here"
                errors={errors.comment}
                inputType="textarea"
                className="!bg-light"
              />
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-24 py-3 font-poly text-white transition-all hover:bg-primary-light"
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg bg-auxiliary px-24 py-3 font-poly text-white transition-all hover:bg-auxiliary-light"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
      <Title className="mb-8 mt-20">Reviews</Title>
      <div className="grid gap-10 md:grid-cols-2">
        {reviews.map((review: any) => (
          <Comment
            key={review.id}
            {...review}
            userId={user?._id}
            handleOpenModal={handleOpenModal(review.id)}
            handleUpdate={() => {
              handleUpdate(review.id, review.review, review.rating);
            }}
          />
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="Delete comment"
        description="Are you sure you want to delete this comment?"
      />
    </>
  );
};

export default Reviews;
