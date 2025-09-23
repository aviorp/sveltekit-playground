import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ route }) => {
  if (!route.id) {
    throw redirect(302, "/dashboard");
  }

  return {};
};
