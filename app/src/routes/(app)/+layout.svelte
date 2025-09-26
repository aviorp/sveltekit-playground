<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import { ModeWatcher } from "mode-watcher";
  import { fade } from "svelte/transition";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { getUserStore } from "../../stores/user.svelte";
  import type { Session, User } from "better-auth";

  export let data: {
    user: User | null;
    session: Session | null;
  };
  const fadeParams = { duration: 450 };
  const userStore = getUserStore();

  onMount(() => {
    console.log("Layout mounted");
    console.log(data);
    if (data.user && data.session) {
      userStore.setUser(data.user);
      userStore.setSession(data.session);
    }
    const el = document.getElementById("app-loader");
    if (el) {
      el.classList.add("hidden");
      setTimeout(() => el.remove(), 220);
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <style>
    /* Minimal critical CSS to avoid FOUC */
    #app-loader {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background);
      color: var(--color-primary);
      /* color: var(--color-primary-foreground); */
      overlay: none;
      z-index: 9999;
      transition: opacity 200ms ease;
    }
    #app-loader.hidden {
      opacity: 0;
      pointer-events: none;
    }
    .spinner {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid var(--color-primary-foreground);
      border-top-color: var(--color-primary);
      animation: spin 0.45s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
</svelte:head>

<div id="app-loader" aria-label="Loading application" role="status">
  <div class="spinner"></div>
</div>

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
