import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "le nom doit contenir au moins 3 caractères"),

    email: z.string().email("Email invalide"),

    password: z
      .string()
      .min(8, "le mot de passe doit contenir au moins 8 caractères"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
