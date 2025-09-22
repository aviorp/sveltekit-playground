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
    //  Set the cookie with the token
    event.cookies.set("sb-access-token", session.token, {
      secure: true,
      httpOnly: true,
      path: "/",
    });
  } else {
    event.locals.session = null;
    event.locals.user = null;
    event.cookies.delete("sb-access-token", { path: "/" });
  }

  return svelteKitHandler({ event, resolve, auth, building });
}
