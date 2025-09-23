<script lang="ts">
  import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
</script>

<div class="relative min-h-screen flex">
  <div
    class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0"
  >
    <!-- Left side - Welcome banner -->
    <div
      class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900 text-white bg-no-repeat bg-cover relative"
    >
      <div
        class="absolute bg-gradient-to-b from-primary/75 to-primary opacity-75 inset-0 z-0"
      ></div>
      <div class="w-full max-w-md z-10">
        <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
          Your Ultimate SvelteKit App , Made With ❤️
        </div>
        <div class="sm:text-sm xl:text-md text-slate-200 font-normal">
          Welcome to your ultimate SvelteKit application! This app is designed
          to provide a seamless and efficient user experience , leveraging the
          power of SvelteKit for building fast and modern web applications.
          Whether you're here to sign up or log in , we're excited to have you
          on board . Let's get started on your journey with us!
        </div>
      </div>
      <!-- Animated circles -->
      <ul class="circles">
        {#each Array(12) as _, i}
          <li></li>
        {/each}
      </ul>
    </div>

    <!-- Right side - Auth form container -->
    <div
      class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 md:default-none bg-background"
    >
      <!-- Navigation -->
      <div class="absolute top-4 left-4">
        <button
          class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span class="font-semibold">Your App Name</span>
        </button>
      </div>

      <!-- Auth form content -->
      <div class="max-w-md w-full space-y-8 px-4">
        <slot />
      </div>
    </div>
  </div>
</div>
