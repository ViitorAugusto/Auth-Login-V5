import { db } from "@/lib/db";

export const getVericationTokenByToken = async (token: string) => {
  try {
    const vericationToken = await db.vericantionToken.findUnique({
      where: {
        token,
      },
    });
    return vericationToken;
  } catch {
    return null;
  }
};


export const getVericationTokenByEmail = async (email: string) => {
  try {
    const vericationEmail = await db.vericantionToken.findFirst({
      where: {
        email,
      },
    });
    return vericationEmail;
  } catch {
    return null;
  }
};
