import { z } from "zod";


export const NewPasswordShema = z.object({
  password: z.string().min(1, {
    message: "Senha é obrigatoria",
  }),
});

export const ResetShema = z.object({
  email: z.string().email({
    message: "Email é obrigatorio",
  }),
});

export const LoginShema = z.object({
  email: z.string().email({
    message: "Email é obrigatorio",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatoria",
  }),
  code: z.optional(z.string()),
});

export const RegisterShema = z.object({
  email: z.string().email({
    message: "Email é obrigatorio",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter pelo menos 6 caracteres",
  }),
  name: z.string().min(1, {
    message: "Nome é obrigatorio",
  }),
});
