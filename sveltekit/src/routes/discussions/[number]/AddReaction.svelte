<script lang="ts">
	import { REACTIONS, REACTION_EMOJI } from '../../../lib/reactions';

	let shown = false;

	function addReaction(reaction: (typeof REACTIONS)[number]) {
		console.log('react with', reaction);
		shown = false;
	}
</script>

<div class="add-reaction">
	<button on:click={() => (shown = !shown)}>Add reaction</button>
	<dialog open={shown}>
		{#each REACTIONS as reaction}
			<button on:click={() => addReaction(reaction)}>{REACTION_EMOJI[reaction]}</button>{' '}
		{/each}
	</dialog>
</div>

<style>
	.add-reaction {
		display: inline-block;
		position: relative;
	}

	dialog {
		left: calc(100% + 0.3em);
		top: 0;
		white-space: nowrap;
		border: 1px solid var(--color-bg-1);
		border-radius: 0.5em;
		padding: 0.3em;
	}
</style>
