import type { PageLoad } from './$types';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageLoad = () => {
	const news = [
		{
			id: 1,
			time: 1688027089817,
			by: 'frigus02',
			title: 'My first new story',
			text: 'http://www.getdropbox.com/u/2/screencast.html'
		},
		{
			id: 2,
			time: 1688027089817,
			by: 'frigus02',
			title: 'Another story. Really good. Please read',
			text: 'http://www.getdropbox.com/u/2/screencast.html'
		}
	];
	return { news };
};
