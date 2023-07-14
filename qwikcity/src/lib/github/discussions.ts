import {Octokit} from "octokit";

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
		throw new Error(`Missing ${key} environnement variable.`);
	}

	return value;
}

interface QueryVariables {
	[name: string]: unknown;
}

async function queryGraphQl<T>(query: string,  parameters: QueryVariables = {}): Promise<T> {	

	const GITHUB_REPO_OWNER = "frigus02"; // requireEnv('GITHUB_REPO_OWNER');
	const GITHUB_REPO_NAME = "wpfs2023-starter"; // requireEnv('GITHUB_REPO_NAME');

	const GITHUB_TOKEN = requireEnv('GITHUB_TOKEN');

	const octokit = new Octokit({ auth: GITHUB_TOKEN });
	return  await octokit.graphql(query, Object.assign({
		repoOwner: GITHUB_REPO_OWNER,
		repoName: GITHUB_REPO_NAME
	}, parameters));
}

export async function getDiscussionList(): Promise<Discussion[]> {
	const body = await queryGraphQl(`
		query discussionList($repoOwner: String!, $repoName: String!) {
			repository(owner: $repoOwner, name: $repoName) {
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

	const discussions = (body as any).repository.discussions.edges.map((edge: any) => ({
		number: edge.node.number,
		title: edge.node.title,
		createdAt: edge.node.author.login,
		time: edge.node.createdAt
	}));

  return discussions;
}

export async function getDiscussionDetails(number: number): Promise<DiscussionDetails> {
	const body = await queryGraphQl(
		`
		query discussionDetails($repoOwner: String!, $repoName: String!, $number: Int!) {
			repository(owner: $repoOwner, name: $repoName) {
				discussion(number: $number) {
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
	`, {number});

	const discussion = (body as any).repository.discussion;
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
	const body = await queryGraphQl(
		`
		query discussionComments($repoOwner: String!, $repoName: String!, $number: Int!) {
			repository(owner: $repoOwner, name: $repoName) {
				discussion(number: $number) {
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
	`, {number});

	const comments = (body as any).repository.discussion.comments.edges;
	return comments.map((comment: any) => ({
		author: comment.node.author.login,
		createdAt: comment.node.createdAt,
		bodyHTML: comment.node.bodyHTML
	}));
}
