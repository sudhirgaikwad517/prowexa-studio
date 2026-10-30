// Applies db/schema.sql to the database in DATABASE_URL.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(__dirname, "../db/schema.sql");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env or your environment first.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  await client.query(fs.readFileSync(schemaPath, "utf-8"));
  console.log("Database schema is up to date.");
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
