import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Database is now optional - using in-memory storage by default
// Only connect if DATABASE_URL is provided
export const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;
