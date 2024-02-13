import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z.string().refine(
    (value) => {
      const intValue = parseInt(value, 10);
      return (
        !isNaN(intValue) &&
        Number.isInteger(intValue) &&
        intValue >= 1 &&
        intValue <= 5
      );
    },
    {
      message: "Rating must be a valid integer between 1 and 5",
    }
  ),
  comment: z.string().min(1),
});
