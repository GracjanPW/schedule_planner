"server only";
import db from "@/db";

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
  } catch (error) {
    client?.release();
    return undefined;
  }
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
  } catch (error) {
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
  } catch (error) {
    client?.release();
    return undefined;
  }
}
