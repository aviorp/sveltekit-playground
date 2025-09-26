import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
  const { id } = params;

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + id
  );

  const post = await response.json();
  console.log(post);
  return post;
};
