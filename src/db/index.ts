import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

if (false) {
  pool.on("error", (e) => {
    console.log(e);
  });

  pool.on("connect", (e) => {
    console.log(e);
  });

  pool.on("release", (e) => {
    console.log(e);
  });
}

export default pool;
