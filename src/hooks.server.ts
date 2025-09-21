import { auth } from "@/auth/server-client"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
  console.log("Handling request for:", event.url.pathname);
  return svelteKitHandler({ event, resolve, auth, building });
}
