import { redirect } from "@sveltejs/kit";
import { Counter } from "../../stores/counter.svelte.js";

export const load = async ({ locals, request }) => {
  if (!locals.user || !locals.session) {
    redirect(303, "/login");
  }

  return {
    user: locals.user,
    session: locals.session,
  };
};
