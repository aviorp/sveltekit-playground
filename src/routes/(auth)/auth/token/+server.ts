import { auth } from "@/auth/server-client";

export const GET = async () => {
  try {
    return new Response(JSON.stringify({ token: crypto.randomUUID() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to generate token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
