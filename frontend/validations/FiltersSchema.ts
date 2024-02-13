import { z } from "zod";

export const FiltersSchema = z.object({
  name: z.string().optional(),
  difficulty: z.string().optional(),
  priceFrom: z.coerce.number().min(0).max(10000).nullable().optional(),
  priceTo: z.coerce.number().min(0).max(10000).nullable().optional(),
  rating: z.coerce.number().nullable().optional(),
  duration: z.string().optional(),
  maxGroupSize: z.coerce.number().min(0).max(100).nullable().optional(),
});
