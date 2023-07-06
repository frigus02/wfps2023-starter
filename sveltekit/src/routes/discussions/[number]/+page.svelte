<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.title} - Discussions</title>
	<meta name="description" content="WPFS 2023 Discussions" />
</svelte:head>

<section>
	<h1>{data.title}</h1>
	<p>by {data.author} on {data.createdAt}</p>
	<p>{@html data.bodyHTML}</p>
</section>

<style>
</style>
