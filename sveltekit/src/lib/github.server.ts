import { env } from '$env/dynamic/private';

export async function queryGraphQl(query: string): Promise<unknown> {
	if (!env.GITHUB_TOKEN) {
		throw new Error('Missing GITHUB_TOKEN env var. Did you create a .env file?');
	}

	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer ${env.GITHUB_TOKEN}`
		},
		body: JSON.stringify({ query })
	});
	return await res.json();
}
