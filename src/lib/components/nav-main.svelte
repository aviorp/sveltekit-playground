<script lang="ts">
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { Icon } from "@tabler/icons-svelte";

  let { items }: { items: { title: string; url: string; icon?: Icon }[] } =
    $props();

  function isRouteActive(url: string) {
    return url === page.url.pathname;
  }
</script>

<Sidebar.Group>
  <Sidebar.GroupContent class="flex flex-col gap-2">
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton
            tooltipContent={item.title}
            isActive={isRouteActive(item.url)}
          >
            {#if item.icon}
              <item.icon />
            {/if}
            <span>{item.title}</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
