import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

function isAuthRoute(pathname: string) {
  return pathname === "/login" || pathname === "/sign-up";
}

function isSafeNext(next: string | null): string | null {
  if (!next) return null;
  try {
    // Allow only same-origin relative paths (start with '/')
    if (!next.startsWith("/")) return null;
    // Optionally, block auth routes as next targets to avoid loops
    if (isAuthRoute(next)) return null;
    return next;
  } catch {
    return null;
  }
}
export const load: LayoutServerLoad = async ({ locals, url }) => {
  const pathname = url.pathname;
  const user = locals.user;

  // If unauthenticated and not on an auth route, send to login with next
  if (!user && !isAuthRoute(pathname)) {
    const next = encodeURIComponent(pathname + (url.search ? url.search : ""));
    throw redirect(302, `/login?next=${next}`);
  }

  // If authenticated and currently on an auth route, bounce away
  // Prefer the requested next if it's safe; else go to /dashboard
  if (user && isAuthRoute(pathname)) {
    const safe = isSafeNext(url.searchParams.get("next"));
    throw redirect(302, safe ?? "/dashboard");
  }

  // If authenticated and on the site root, send to dashboard
  if (user && pathname === "/") {
    throw redirect(302, "/dashboard");
  }

  // Do NOT auto-redirect on presence of ?next in general pages.
  // Let the login page consume ?next and redirect after successful login only.

  return {};
};
