import { Note, Tag } from '../reducer/types';

export const findTagsString = (str: string): Tag[] => {
	const matches = str.match(/#[\p{L}\d]+/gu);
	return matches
		? matches
				.filter((tag): tag is string => tag != null)
				.map(tag => ({ tag, id: crypto.randomUUID(), checked: false }))
		: [];
};

export const findTagsArray = (notes: Note[]): Tag[] =>
	notes
		.map(({ content }) => content.match(/#[\p{L}\d]+/gu))
		.flat()
		.filter((match): match is string => match != null)
		.map(tag => ({ tag, id: crypto.randomUUID(), checked: false }));
