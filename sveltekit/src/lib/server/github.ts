import { env } from '$env/dynamic/private';

import type { REACTIONS } from '../reactions';

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
	content: (typeof REACTIONS)[number];
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
	const discussion = (body as any).data.repository.discussion;
	return {
		number: discussion.number,
		title: discussion.title,
		author: discussion.author.login,
		createdAt: discussion.createdAt,
		reactionGroups: discussion.reactionGroups.map((group: any) => ({
			content: group.content,
			totalCount: group.reactors.totalCount
		})),
		bodyHTML: discussion.bodyHTML
	};
}

export interface DiscussionComment {
	author: string;
	createdAt: string;
	bodyHTML: string;
}

export async function getDiscussionComments(number: number): Promise<DiscussionComment[]> {
	const body = await queryGraphQl(`
		{
			repository(owner: "${GITHUB_REPO_OWNER}", name: "${GITHUB_REPO_NAME}") {
				discussion(number: ${number}) {
					comments(last: 10) {
						edges {
							node {
								author {
									login
								}
								createdAt
								bodyHTML
							}
						}
					}
				}
			}
		}
	`);
	const comments = (body as any).data.repository.discussion.comments.edges;
	return comments.map((comment: any) => ({
		author: comment.node.author.login,
		createdAt: comment.node.createdAt,
		bodyHTML: comment.node.bodyHTML
	}));
}
