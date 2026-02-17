import { defineConfig } from "drizzle-kit";

// Database is now optional - only needed if you want to use PostgreSQL
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost/dummy";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
