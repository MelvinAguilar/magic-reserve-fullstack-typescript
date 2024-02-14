import { z } from "zod";

export const TourSchema = z.object({
  name: z.string().min(1),
  duration: z.coerce.number().min(1),
  maxGroupSize: z.coerce.number().min(1),
  difficulty: z.string().min(1),
  price: z.coerce.number().min(1),
  priceDiscount: z.coerce.number().optional().nullable(),
  summary: z.string().min(1),
  description: z.string().min(1),
  startLocation: z.object({
    coordinates: z.array(z.coerce.number()),
    address: z.string().min(1).optional().nullable(),
    description: z.string().min(1),
  }),
  locations: z.array(
    z.object({
      coordinates: z.array(z.coerce.number()),
      address: z.string().min(1).optional().nullable(),
      description: z.string().min(1),
      day: z.coerce.number().min(1),
    }),
  ),
});
