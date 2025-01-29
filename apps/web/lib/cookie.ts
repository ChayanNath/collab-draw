"use server";

import { cookies } from "next/headers";

export const setTokenCookie = async (token: string) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 15);

  (await cookies()).set({
    name: "token",
    value: token,
    expires: expireDate,
    httpOnly: false,
    sameSite: false,
  });
};

export const getVerifiedToken = async (): Promise<string | null> => {
  const token = (await cookies()).get("token")?.value || null;
  return token;
};

export const removeTokenCookie = async () => {
  (await cookies()).delete("token");
};
