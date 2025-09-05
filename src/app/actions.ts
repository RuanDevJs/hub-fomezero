'use server'

import { cookies } from "next/headers";

export async function logoutSession() {
  const cookieHandler = await cookies();

  cookieHandler.delete("@hubfome-zero:auth-token");
  cookieHandler.delete("@hubfome-zero:auth-email");

}
