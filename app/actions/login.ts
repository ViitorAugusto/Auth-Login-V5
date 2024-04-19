"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginShema } from "@/schema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginShema>) => {
  const validatedFields = LoginShema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
     return { success: true, message: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};
