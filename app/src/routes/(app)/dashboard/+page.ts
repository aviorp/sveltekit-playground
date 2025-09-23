import type { Load } from "@sveltejs/kit";

export const load: Load = async (event) => {
  return {
    title: "Home Page",
    description: "Welcome to the home page!",
  };
};
