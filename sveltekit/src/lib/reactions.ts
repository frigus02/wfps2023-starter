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
