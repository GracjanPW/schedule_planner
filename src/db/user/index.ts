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
  let client;
  try {
    client = await db.connect();
    const res = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    client.release();
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    client?.release();
    return undefined;
  }
}

export async function FindUserById(
  id: number,
): Promise<User | null | undefined> {
  let client;
  try {
    client = await db.connect();
    const res = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    client?.release();
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
  let client;
  try {
    client = await db.connect();
    const res = await client.query(
      "INSERT INTO users (email, password) values ($1, $2) RETURNING *",
      [data.email, data.password],
    );
    client.release();
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    client?.release();
    return undefined;
  }
}

export async function RemoveUserByEmail(
  email: string,
): Promise<number | null | undefined> {
  let client;
  try {
    client = await db.connect();
    const res = await client.query("DELETE FROM users WHERE email = $1", [
      email,
    ]);
    client.release();
    return res.rowCount;
  } catch {
    client?.release();
    return undefined;
  }
}
