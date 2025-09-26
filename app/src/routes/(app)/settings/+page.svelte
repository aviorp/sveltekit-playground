<script lang="ts">
  import AppPage from "@/components/app-page.svelte";
  import Button from "@/components/ui/button/button.svelte";
  import AppHeader from "@/components/app-header.svelte";

  import { getCounterStore } from "../../../stores/counter.svelte.js";

  let { data } = $props();

  let counterStore = getCounterStore();
  let randomNumber = Math.floor(Math.random() * 100);
</script>

<AppHeader />

<AppPage>
  <h2>{data.title}</h2>
  <p>{data.description}</p>
  <p>Counter: {counterStore.counter}</p>
  <Button onclick={() => counterStore.increment()}>Increment</Button>

  <Button href={`/dashboard/${randomNumber}`}
    >Get a random number page: {randomNumber}
  </Button>
</AppPage>
