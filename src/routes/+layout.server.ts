import { redirect } from "@sveltejs/kit";

export const load = async ({ route }) => {
  if (!route.id) {
    throw redirect(302, "/dashboard");
  }
  return {};
};
