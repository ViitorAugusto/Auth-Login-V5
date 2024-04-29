"use server";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginShema } from "@/schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/email";
import {
  getTwoFactorTokenByEmail,
  getTwoFactorTokenByToken,
} from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/tow-factor-confirmation";

export const login = async (values: z.infer<typeof LoginShema>) => {
  const validatedFields = LoginShema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const vericationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(vericationToken.email, vericationToken.token);
    return { success: "Confirm your email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid Code" };
      if (twoFactorToken.token !== code) return { error: "Invalid Code" };
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if(hasExpired) return { error: "Code has expired" };
      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      })
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if(existingConfirmation){
        await db.twoFactorconfirmation.delete({
          where: {
            id: existingConfirmation.id
          }
        })
      }
      await db.twoFactorconfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Ocorreu um Erro ao Fazer Login! " };
      }
    }
    throw error;
  }
};
