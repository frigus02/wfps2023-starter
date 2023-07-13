
export interface Discussion {
	number: number;
	title: string;
	author: string;
	createdAt: string;
}

export const REACTIONS = [
	'THUMBS_UP',
	'THUMBS_DOWN',
	'LAUGH',
	'HOORAY',
	'CONFUSED',
	'HEART',
	'ROCKET',
	'EYES'
] as const;

export const REACTION_EMOJI: Record<(typeof REACTIONS)[number], string> = {
	THUMBS_UP: '👍',
	THUMBS_DOWN: '👎',
	LAUGH: '😄',
	HOORAY: '🎉',
	CONFUSED: '😕',
	HEART: '❤️',
	ROCKET: '🚀',
	EYES: '👀'
};

export interface ReactionGroup {
	content: (typeof REACTIONS)[number];
	totalCount: number;
}

export interface DiscussionDetails extends Discussion {
	reactionGroups: ReactionGroup[];
	bodyHTML: string;
}

function requireEnv(key: string): string {
	const value = process.env[key];
	if (value == null) {
		throw new Error(`Missing ${key} env var. Did you create a .env file?`);
	}

	return value;
}

// const GITHUB_APP_ID = requireEnv('GITHUB_APP_ID');
// const GITHUB_CLIENT_ID = requireEnv('GITHUB_CLIENT_ID');
// const GITHUB_CLIENT_SECRET = requireEnv('GITHUB_CLIENT_SECRET');
// const GITHUB_INSTALLATION_ID = Number(requireEnv('GITHUB_INSTALLATION_ID'));
const GITHUB_REPO_OWNER = "angular"; // requireEnv('GITHUB_REPO_OWNER');
const GITHUB_REPO_NAME = "angular"; // requireEnv('GITHUB_REPO_NAME');


async function queryGraphQl(query: string): Promise<unknown> {
	const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
	if (!GITHUB_TOKEN) {
		throw new Error('Missing GITHUB_TOKEN env var. Did you create a .env file?');
	}
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer ${GITHUB_TOKEN}`
		},
		body: JSON.stringify({ query })
	});
	return await res.json();
}

export async function getDiscussionList(): Promise<Discussion[]> {
	const body = await queryGraphQl(`
		{
			repository(owner: "${GITHUB_REPO_OWNER}", name: "${GITHUB_REPO_NAME}") {
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
