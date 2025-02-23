import { cookies } from "next/headers";
import { FindUserSessionBySessionId } from "@/db/user";

export type UserSession = {
  id: number;
  email: string;
};

const COOKIE_NAME = process.env.SESSION_COOKIE
if (!COOKIE_NAME) throw new Error("SESSION_COOKIE env var not set")

export async function Auth(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionID = cookieStore.get(COOKIE_NAME!);

  const session =  FindUserSessionBySessionId(sessionID?.value)

  if (!session && sessionID) cookieStore.delete(COOKIE_NAME!)
  return session
}
