import { auth } from "@/auth/server-client"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { redirect } from "@sveltejs/kit";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/about"];

export async function handle({ event, resolve }) {
  const fetchedSession = await auth.api.getSession({
    headers: event.request.headers,
  });

  if (fetchedSession) {
    const { session, user } = fetchedSession;
    event.locals.session = session;
    event.locals.user = user;
  } else {
    delete event.locals.session;
    delete event.locals.user;
  }

  return svelteKitHandler({ event, resolve, auth, building });
}
