import { For, createSignal } from 'solid-js';
import { REACTIONS, REACTION_EMOJI } from '~/lib/github/discussions';
import './AddReaction.css';

export function AddReaction() {
	const [shown, setShown] = createSignal(false);

	function addReaction(reaction: (typeof REACTIONS)[number]) {
		console.log('react with', reaction);
		setShown(false);
	}

	return (
		<div class="add-reaction">
			<button onClick={() => setShown((s) => !s)}>Add reaction</button>
			<dialog open={shown()}>
				<For each={REACTIONS}>{(reaction) => <button>{REACTION_EMOJI[reaction]}</button>}</For>
			</dialog>
		</div>
	);
}
