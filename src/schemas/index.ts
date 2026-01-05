import { z } from "zod"

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El email es obligatorio" })
      .email({ message: "El email no es válido" }),
    name: z
      .string()
      .min(1, { message: "El nombre debe tener al menos 2 caracteres" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    password_confirmation: z
      .string()
      .min(8, { message: "La contraseña debe coincidir" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  })

export const SuccessSchema = z.string().min(1, { message: "Cuenta Creada" })
export const ErrorSchema = z.object({
  error: z.string(),
})
