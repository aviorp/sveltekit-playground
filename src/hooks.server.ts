import { auth } from "@/auth/server-client"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
  const fetchedSession = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (fetchedSession) {
    const { session, user } = fetchedSession;
    event.locals.session = session;
    event.locals.user = user;
  } else {
    event.locals.session = null;
    event.locals.user = null;
  }

  return svelteKitHandler({ event, resolve, auth, building });
}
