<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>News</title>
	<meta name="description" content="WPFS 2023 News" />
</svelte:head>

<section>
	<h1>News</h1>
	<ol class="news">
		{#each data.news as row (row.id)}
			<li>
				<a href="/news/{row.id}"><h2>{row.title}</h2></a>
				<p>by {row.by} on {row.time}</p>
			</li>
		{/each}
	</ol>
</section>

<style>
	.news {
		margin: 0;
		padding: 0;
	}

	.news li {
		display: block;
	}

	.news li:not(:first-child) {
		border-top: 1px solid var(--color-bg-0);
	}
</style>
