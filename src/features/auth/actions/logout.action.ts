"use server";

import { AUTH_LOGIN_PAGE, SESSION_COOKIE_NAME } from "@/app.config";
import { DeleteSession } from "@/db/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutAction() {
  const cookieStore = await cookies();
  await DeleteSession(cookieStore.get(SESSION_COOKIE_NAME)!.value);
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect(AUTH_LOGIN_PAGE);
}
