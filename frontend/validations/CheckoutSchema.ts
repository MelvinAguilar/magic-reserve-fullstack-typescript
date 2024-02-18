import { z } from "zod";

export const CheckoutSchema = z.object({
  email: z.string().email(),
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  expirationDate: z.string().length(5, "Expiration date must be in the format MM/YY"),
  cvc: z.string().length(3, "CVC must be 3 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});