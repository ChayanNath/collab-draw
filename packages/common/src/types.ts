import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().min(3).max(20),
  name: z.string(),
  password: z.string().min(6),
});

export const SignInSchema = z.object({
  email: z.string().min(3).max(20),
  password: z.string().min(6),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});
