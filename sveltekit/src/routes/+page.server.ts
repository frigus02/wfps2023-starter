import { type Discussion, getDiscussionList } from '../lib/github.server';

import type { PageServerLoad } from './$types';

export interface Data {
	discussions: Discussion[];
}

export const load: PageServerLoad<Data> = async () => {
	const discussions = await getDiscussionList();
	return { discussions };
};
