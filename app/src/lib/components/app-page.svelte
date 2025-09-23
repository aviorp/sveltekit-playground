<script lang="ts">
  let { children } = $props();
</script>

<div class="flex flex-1 flex-col">
  <div class="@container/main flex flex-1 flex-col gap-2">
    <div class="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
      {@render children?.()}
    </div>
  </div>
</div>
