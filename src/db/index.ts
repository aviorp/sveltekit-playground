import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schemas/schema";
import { env } from "$env/dynamic/private";

if (!env.VITE_DATABASE_URL) throw new Error("VITE_DATABASE_URL is not set");

const client = neon(env.VITE_DATABASE_URL);

export const db = drizzle(client, { schema });
