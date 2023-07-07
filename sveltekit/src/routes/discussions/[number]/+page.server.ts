import { error } from '@sveltejs/kit';

import {
	type DiscussionComment,
	type DiscussionDetails,
	getDiscussionComments,
	getDiscussionDetails
} from '../../../lib/server/github';

import type { PageServerLoad } from './$types';

export interface Data {
	discussion: DiscussionDetails;
	comments: DiscussionComment[];
}

export const load: PageServerLoad<Data> = async ({ params }) => {
	const number = Number(params.number);
	if (isNaN(number)) {
		throw error(404, 'invalid discussion number');
	}

	const discussion = await getDiscussionDetails(number);
	const comments = await getDiscussionComments(number);
	return { discussion, comments };
};
