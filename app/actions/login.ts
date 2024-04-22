"use server";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginShema } from "@/schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/token";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/email";

export const login = async (values: z.infer<typeof LoginShema>) => {
  const validatedFields = LoginShema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const vericationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(vericationToken.email, vericationToken.token);
    return { success: "Confirm your email sent!" };
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
