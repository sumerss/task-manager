import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.connect()
  .then(() => console.log("🟢 Connected to PostgreSQL"))
  .catch((err) => console.error("🔴 PostgreSQL connection error", err));
