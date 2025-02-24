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
  try {
    const res = await db.query("SELECT * FROM sessions WHERE uuid = $1", [
      sessionUUID,
    ]);
    console.log({ res });
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function CreateSession(
  sessionUUID: string,
  userId: number,
): Promise<Session | null | undefined> {
  try {
    const res = await db.query(
      "INSERT INTO sessions (uuid, user_id) values ($1, $2) RETURNING uuid",
      [sessionUUID, userId],
    );
    if (!res.rowCount) return null;
    return res.rows[0];
  } catch {
    return undefined;
  }
}

export async function DeleteSession(
  sessionUUID: string,
): Promise<number | null | undefined> {
  let client;
  try {
    const res = await db.query("DELETE FROM sessions WHERE uuid = $1", [
      sessionUUID,
    ]);
    return res.rowCount;
  } catch {
    return undefined;
  }
}
