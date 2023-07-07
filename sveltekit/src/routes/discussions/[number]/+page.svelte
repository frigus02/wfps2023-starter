<script lang="ts">
	import { REACTION_EMOJI } from '../../../lib/reactions';
	import AddReaction from './AddReaction.svelte';
	export let data;

	$: ({ discussion, comments } = data);
	$: currentReactions = discussion.reactionGroups.filter((group) => group.totalCount > 0);
</script>

<svelte:head>
	<title>{discussion.title} - Discussions</title>
	<meta name="description" content="WPFS 2023 Discussions" />
</svelte:head>

<section>
	<h1>{discussion.title}</h1>
	<p>by {discussion.author} on {discussion.createdAt}</p>
	<div>{@html discussion.bodyHTML}</div>
	<div class="reactions">
		{#each currentReactions as group (group.content)}
			<button disabled>
				{REACTION_EMOJI[group.content]}
				{group.totalCount}
			</button>{' '}
		{/each}
		<AddReaction />
	</div>
	<div class="comments">
		<h2>Comments</h2>
		<ul>
			{#each comments as comment}
				<li>
					{comment.author}
					{comment.createdAt}
					{@html comment.bodyHTML}
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
</style>
