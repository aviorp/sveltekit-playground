import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (!locals.user || !locals.session) {
    redirect(303, "/login");
  }

  return {
    user: locals.user,
    session: locals.session,
  };
};
