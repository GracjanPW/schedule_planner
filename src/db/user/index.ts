"server only";
import db from "@/db";
import { DeleteSession, FindSessionById } from "../session";
import { isBefore } from "date-fns";

export type User = {
  id: number;
  email: string;
  password: string;
  created_at: Date;
};

export async function FindUserByEmail(
  email: string,
): Promise<User | null | undefined> {
  try {
    const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    return undefined;
  }
}

export async function FindUserById(
  id: number,
): Promise<User | null | undefined> {
  let client;
  try {
    const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    return undefined;
  }
}

export async function FindUserSessionBySessionId(
  uuid: string | null | undefined,
) {
  if (!uuid) return null;
  const session = await FindSessionById(uuid as string);
  if (!session) return null;
  if (isBefore(session.expires_at, Date.now())) {
    await DeleteSession(uuid);
    return null;
  }
  const user = await FindUserById(session.user_id);
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
  };
}

export async function CreateUser(data: {
  email: string;
  password: string;
}): Promise<User | null | undefined> {
  try {
    const res = await db.query(
      "INSERT INTO users (email, password) values ($1, $2) RETURNING *",
      [data.email, data.password],
    );
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    return undefined;
  }
}

export async function RemoveUserByEmail(
  email: string,
): Promise<number | null | undefined> {
  try {
    const res = await db.query("DELETE FROM users WHERE email = $1", [email]);
    return res.rowCount;
  } catch {
    return undefined;
  }
}
