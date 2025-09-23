import type { Load } from "@sveltejs/kit";

export const load: Load = async (event) => {
  return {
    title: "Settings Page",
    description: "Welcome to the Settings page!",
  };
};
