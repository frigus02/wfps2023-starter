import { type DiscussionDetails, getDiscussionDetails } from '../../../lib/github.server';

import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad<DiscussionDetails> = async ({ params }) => {
	const number = Number(params.number);
	if (isNaN(number)) {
		throw error(404, 'invalid discussion number');
	}

	return await getDiscussionDetails(number);
};
