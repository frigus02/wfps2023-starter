
export interface DiscussionListItem {
	id: number,
	title: string,
	by: string,
	time: any
}

async function queryGraphQl(query: string): Promise<unknown> {
	console.log('===', process.env);
	const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
	if (!GITHUB_TOKEN) {
		throw new Error('Missing GITHUB_TOKEN env var. Did you create a .env file?');
	}
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer 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`
		},
		body: JSON.stringify({ query })
	});
	return await res.json();
}

export async function loadDiscussionsList(): Promise<DiscussionListItem[]> {
	const body = await queryGraphQl(`
		{
			repository(owner: "angular", name: "angular") {
				discussions(last: 10) {
					edges {
						node {
							number
							title
							author {
								login
							}
							createdAt
						}
					}
				}
			}
		}
	`);
	const discussions = (body as any).data.repository.discussions.edges.map((edge: any) => ({
		id: edge.node.number,
		title: edge.node.title,
		by: edge.node.author.login,
		time: edge.node.createdAt
	}));

  return discussions;
}
