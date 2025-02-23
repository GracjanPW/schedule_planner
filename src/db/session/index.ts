"server only";
import db from "@/db";

export type Session = {
  uuid: string;
  user_id: number;
  created_at: Date;
  expires_at: Date;
};

export async function FindSessionById(
  sessionUUID: string,
): Promise<Session | null | undefined> {
  let client;
  try {
    client = await db.connect();
    const res = await client.query("SELECT * FROM sessions WHERE uuid = $1", [
      sessionUUID,
    ]);
    client.release();
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    client?.release();
    return undefined;
  }
}

export async function CreateSession(
  sessionUUID: string,
  userId: number,
): Promise<Session | null | undefined> {
  let client;
  try {
    client = await db.connect();
    const res = await client.query(
      "INSERT INTO sessions (uuid, user_id) values ($1, $2) RETURNING uuid",
      [sessionUUID, userId],
    );
    client.release();
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    client?.release();
    return undefined;
  }
}

export async function DeleteSession(
  sessionUUID: string,
): Promise<number | null | undefined> {
  let client;
  try {
    client = await db.connect();
    const res = await client.query("DELETE FROM sessions WHERE uuid = $1", [
      sessionUUID,
    ]);
    client.release();
    return res.rowCount;
  } catch {
    client?.release();
    return undefined;
  }
}
