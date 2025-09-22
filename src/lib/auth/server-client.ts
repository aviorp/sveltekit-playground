import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db";
import { jwt } from "better-auth/plugins";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailVerification: {
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
  },

  plugins: [jwt()],
});
