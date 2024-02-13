import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  photo: z.string().url().optional(),
});

export const PasswordUpdateSchema = z.object({
  passwordCurrent: z.string().min(6),
  password: z.string().min(6),
});
