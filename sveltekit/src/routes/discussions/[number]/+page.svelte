<script lang="ts">
	import { REACTIONS } from '../../../lib/reactions';
	import AddReaction from './AddReaction.svelte';
	export let data;

	$: currentReactions = data.reactionGroups.filter((group) => group.totalCount > 0);
</script>

<svelte:head>
	<title>{data.title} - Discussions</title>
	<meta name="description" content="WPFS 2023 Discussions" />
</svelte:head>

<section>
	<h1>{data.title}</h1>
	<p>by {data.author} on {data.createdAt}</p>
	<div>{@html data.bodyHTML}</div>
	<div class="reactions">
		{#each currentReactions as group (group.content)}
			<button disabled>
				{REACTIONS[group.content] ?? group.content}
				{group.totalCount}
			</button>{' '}
		{/each}
		<AddReaction />
	</div>
</section>

<style>
</style>
