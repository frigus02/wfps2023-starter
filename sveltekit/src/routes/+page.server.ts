import type { PageServerLoad } from './$types';
import { queryGraphQl } from '../lib/github.server';

export const load: PageServerLoad = async () => {
	const body = await queryGraphQl(`
		{
			repository(owner: "frigus02", name: "wpfs2023-starter") {
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
	const news = (body as any).data.repository.discussions.edges.map((edge: any) => ({
		id: edge.node.number,
		title: edge.node.title,
		by: edge.node.author.login,
		time: edge.node.createdAt
	}));
	return { news };
};
