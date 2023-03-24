import { Tag } from '../reducer/types';

export const getUniqueTags = (
	oldTags: Tag[],
	newTags: Tag[] | null = null
): Tag[] => {
	if (!newTags) return oldTags;

	const uniqueTags: Tag[] = [];

	oldTags.forEach(oldTag => {
		if (newTags.find(tag => tag.tag === oldTag.tag)) {
			uniqueTags.push(oldTag);
		}
	});

	newTags.forEach(tag => {
		if (
			!oldTags.find(oldTag => oldTag.tag === tag.tag) &&
			!uniqueTags.find(uniqueTag => uniqueTag.tag === tag.tag)
		) {
			uniqueTags.push(tag);
		}
	});

	return uniqueTags;
};
