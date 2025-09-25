<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { fade, fly } from "svelte/transition";
  import { page } from "$app/state";

  const fadeParams = { duration: 450 };
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Sidebar.Provider
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
  <AppSidebar variant="inset" />
  <Sidebar.Inset>
    {#key page.url.pathname}
      <div in:fade={fadeParams}>
        <slot />
      </div>
    {/key}
  </Sidebar.Inset>
</Sidebar.Provider>
