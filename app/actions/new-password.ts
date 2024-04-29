"use server";
import bcrypt from "bcryptjs";

import * as z from "zod";
import { NewPasswordShema } from "@/schema";
import { getPasswordResetToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
  value: z.infer<typeof NewPasswordShema>,
  token?: string | null
) => {
  if (!token) return { error: "Falta o token" };
  const validatedFields = NewPasswordShema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetToken(token);

  if (!existingToken) {
    return { error: "Token não existe" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token expirado" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email não existe" };
  }

  const hashedPassowrd = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassowrd },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated" };
};
