import { goto } from '$app/navigation';
import { env } from '$env/dynamic/private';

function requireEnv(key: string): string {
	const value = env[key];
	if (value == null) {
		throw new Error(`Missing ${key} env var. Did you create a .env file?`);
	}

	return value;
}

const GITHUB_TOKEN = requireEnv('GITHUB_TOKEN');
const GITHUB_REPO_NAME = requireEnv('GITHUB_REPO_NAME');
const GITHUB_REPO_OWNER = requireEnv('GITHUB_REPO_OWNER');

async function queryGraphQl(query: string): Promise<unknown> {
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: { Authorization: `bearer ${GITHUB_TOKEN}` },
		body: JSON.stringify({ query })
	});
	return await res.json();
}

export interface Discussion {
	number: number;
	title: string;
	author: string;
	createdAt: string;
}

export interface ReactionGroup {
	content: string;
	totalCount: number;
}

export interface DiscussionDetails extends Discussion {
	reactionGroups: ReactionGroup[];
	bodyHTML: string;
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
	const discussions = (body as any).data.repository.discussions.edges;
	return discussions.map((discussion: any) => ({
		number: discussion.node.number,
		title: discussion.node.title,
		author: discussion.node.author.login,
		createdAt: discussion.node.createdAt
	}));
}

export async function getDiscussionDetails(number: number): Promise<DiscussionDetails> {
	const body = await queryGraphQl(`
		{
			repository(owner: "${GITHUB_REPO_OWNER}", name: "${GITHUB_REPO_NAME}") {
				discussion(number: ${number}) {
					number
					title
					author {
						login
					}
					createdAt
					reactionGroups {
						content
						reactors {
							totalCount
						}
					}
					bodyHTML
				}
			}
		}
	`);
	const item = (body as any).data.repository.discussion;
	return {
		number: item.number,
		title: item.title,
		author: item.author.login,
		createdAt: item.createdAt,
		reactionGroups: item.reactionGroups.map((group: any) => ({
			content: group.content,
			totalCount: group.reactors.totalCount
		})),
		bodyHTML: item.bodyHTML
	};
}
