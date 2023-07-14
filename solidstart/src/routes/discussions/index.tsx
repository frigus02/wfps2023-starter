import { For } from 'solid-js';
import { A, Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { getDiscussionList } from '~/lib/github/discussions';

export function routeData() {
	return createServerData$(() => getDiscussionList());
}

export default function Discussions() {
	const discussions = useRouteData<typeof routeData>();
	return (
		<main>
			<Title>Discussions</Title>
			<h1>Discussions</h1>
			<ul>
				<For each={discussions()}>
					{(d) => (
						<li>
							<A href={'/discussions/' + d.number}>{d.title}</A> by {d.author}, created:{' '}
							{d.createdAt}
						</li>
					)}
				</For>
			</ul>
		</main>
	);
}
