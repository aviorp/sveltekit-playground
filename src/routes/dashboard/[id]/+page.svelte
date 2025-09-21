<script lang="ts">
  import AppPage from "@/components/app-page.svelte";
  import SiteHeader from "@/components/app-header.svelte";
  import { Button } from "@/components/ui/button/index.js";

  let { data } = $props();
</script>

<SiteHeader />

<AppPage>
  <h2>Post ID: {data.id}</h2>
  <h2>Post Title: {data.title}</h2>
  <Button href="/dashboard">Go back to Home</Button>

  <p>{data.body}</p>
</AppPage>
