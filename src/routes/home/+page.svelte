<script lang="ts">
  let { data } = $props();

  let counter = $state(0);
  let randomNumber = Math.floor(Math.random() * 100);
</script>

<h2>{data.title}</h2>
<p>{data.description}</p>
<p>Counter: {counter}</p>
<button onclick={() => counter++}>Increment</button>

<a href={`/home/${randomNumber}`}>Get a random number page: {randomNumber} </a>
