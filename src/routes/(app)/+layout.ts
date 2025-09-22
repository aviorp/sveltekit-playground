import type { Load } from "@sveltejs/kit";
import { Counter } from "../../stores/counter.svelte";

export const load: Load = async (event) => {
  const counterStore = new Counter();

  return { counterStore };
};
