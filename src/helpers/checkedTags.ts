import { Tag } from '../reducer/types';

export const checkedTags = (tags: Tag[]): string | null => {
	const checked = tags.filter(el => el.checked);
	return checked.length
		? `Show notes with tags: ${checked.map(el => el.tag).join(', ')}`
		: null;
};
