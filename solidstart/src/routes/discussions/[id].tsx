import { For, createMemo } from 'solid-js';
import { RouteDataArgs, Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { AddReaction } from '~/components/AddReaction';
import {
	REACTION_EMOJI,
	getDiscussionComments,
	getDiscussionDetails
} from '~/lib/github/discussions';

export function routeData({ params }: RouteDataArgs) {
	return createServerData$(
		(id) => {
			const discussionId = Number(id);
			return Promise.all([
				getDiscussionDetails(discussionId),
				getDiscussionComments(discussionId)
			]).then((data) => {
				return { discussion: data[0], comments: data[1] };
			});
		},
		{ key: () => params.id }
	);
}

export default function Discussions() {
	const discussionAndComments = useRouteData<typeof routeData>();
	const reactions = createMemo(
		() => discussionAndComments()?.discussion.reactionGroups.filter((group) => group.totalCount > 0)
	);
	const discussion = () => discussionAndComments()?.discussion;
	const comments = () => discussionAndComments()?.comments;

	return (
		<main>
			<Title> - Discussions</Title>
			<section>
				<h1>{discussion()?.title}</h1>
				<p>
					by {discussion()?.author} on {discussion()?.createdAt}
				</p>
				<div innerHTML={discussion()?.bodyHTML} />
				<div class="reactions">
					<For each={reactions()}>
						{(group) => (
							<button disabled>
								{REACTION_EMOJI[group.content]}
								{group.totalCount}
							</button>
						)}
					</For>
					<AddReaction />
				</div>
				<div class="comments">
					<h2>Comments</h2>
					<ul>
						<For each={comments()}>{(comment) => <div innerHTML={comment.bodyHTML}></div>}</For>
					</ul>
				</div>
			</section>
		</main>
	);
}
