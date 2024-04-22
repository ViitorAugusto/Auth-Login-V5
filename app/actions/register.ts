
"use server";
import bcrypt from "bcrypt";
import { RegisterShema } from "@/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (values: z.infer<typeof RegisterShema>) => {
  const validatedFields = RegisterShema.safeParse(values);
  console.log(values);
  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }
  
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
 
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {error: "Email já em uso"}
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const vericantionToken = await generateVerificationToken(email);
  await sendVerificationEmail(vericantionToken.email, vericantionToken.token);
  return {
    success: "Confirmar seu E-mail",
  };
};
