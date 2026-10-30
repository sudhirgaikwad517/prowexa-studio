import pg from "pg";

// One pool per serverless instance; reused across warm invocations.
let pool: pg.Pool | null = null;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!pool) {
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  }
  return pool;
}

export async function query<T extends pg.QueryResultRow = any>(text: string, params: unknown[] = []) {
  const result = await getPool().query<T>(text, params);
  return result.rows;
}
