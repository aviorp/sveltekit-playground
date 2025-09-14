<script lang="ts">
  let { data } = $props();
</script>

<h2>Post ID: {data.id}</h2>
<h2>Post Title: {data.title}</h2>
<a href="/home">Go back to Home</a>

<p>{data.body}</p>
