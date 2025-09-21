import { defineConfig } from "drizzle-kit";

if (!process.env.VITE_DATABASE_URL)
  throw new Error("VITE_DATABASE_URL is not set");

export default defineConfig({
  schema: "./src/db/schemas/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.VITE_DATABASE_URL },
  verbose: true,
  strict: true,
});
