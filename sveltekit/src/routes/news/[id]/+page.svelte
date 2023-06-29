<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.news.title} - News</title>
	<meta name="description" content="WPFS 2023 News" />
</svelte:head>

<section>
	<h1>{data.news.title}</h1>
	<p>by {data.news.by} on {data.news.time}</p>
	<p>{data.news.text}</p>
</section>

<style>
</style>
