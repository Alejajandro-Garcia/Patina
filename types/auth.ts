import { z } from "zod";

export const AuthFormSchema = z
  .object({
    signUp: z.boolean(),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(10, "At least 10 characters")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number")
      .regex(/[^A-Za-z0-9]/, "Include a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => !data.signUp || data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AuthFormType = z.infer<typeof AuthFormSchema>;
