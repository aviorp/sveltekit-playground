<script lang="ts">
  import AppPage from "@/components/app-page.svelte";
  import Button from "@/components/ui/button/button.svelte";
  import AppHeader from "@/components/app-header.svelte";

  let { data } = $props();

  let counter = $state(0);
  let randomNumber = Math.floor(Math.random() * 100);
</script>

<AppHeader />

<AppPage>
  <h2>{data.title}</h2>
  <p>{data.description}</p>
  <p>Counter: {counter}</p>
  <Button onclick={() => counter++}>Increment</Button>

  <Button href={`/dashboard/${randomNumber}`}
    >Get a random number page: {randomNumber}
  </Button>
</AppPage>
