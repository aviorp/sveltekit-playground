import type { Load } from "@sveltejs/kit";

export const load: Load = async (event) => {
  // const data = await db.select().from("users").limit(10);

  // console.log({ data });
  return {
    title: "Home Page",
    description: "Welcome to the home page!",
  };
};
