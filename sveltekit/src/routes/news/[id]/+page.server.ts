import type { PageServerLoad } from './$types';
import { queryGraphQl } from '../../../lib/github.server';

export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);
	const body = await queryGraphQl(`
		{
			repository(owner: "frigus02", name: "wpfs2023-starter") {
				discussion(number: ${id}) {
					number
					title
					author {
						login
					}
					createdAt
					bodyText
				}
			}
		}
	`);
	const item = (body as any).data.repository.discussion;
	const news = {
		number: item.number,
		title: item.title,
		by: item.author.login,
		time: item.createdAt,
		text: item.bodyText
	};
	return { news };
};
