"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetShema } from "@/schema";
import * as zod from "zod";

export const reset = async (values: zod.z.infer<typeof ResetShema>) => {
  const validateFields = ResetShema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "E-mail not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email sent" };
};
