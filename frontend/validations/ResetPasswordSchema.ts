import { z } from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
