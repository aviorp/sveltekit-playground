import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals, request }) => {
  if (!locals.user || !locals.session) {
    redirect(303, "/login");
  }

  return {
    user: locals.user,
    session: locals.session,
  };
};
