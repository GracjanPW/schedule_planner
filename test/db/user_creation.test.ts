import { describe, expect, test } from "bun:test";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString });

describe("User Creation", () => {
  test("should create a user", async () => {
    const client = await pool.connect();

    const userResult = await client.query(
      `INSERT INTO users (email, password) VALUES ('testuser@example.com', 'testpassword') RETURNING id;`
    );

    console.log(userResult.rows);
    expect(userResult.rows.length).toBe(1);
    await client.query(`DELETE FROM users where id = $1`, [
      userResult.rows[0].id,
    ]);
  });
});
