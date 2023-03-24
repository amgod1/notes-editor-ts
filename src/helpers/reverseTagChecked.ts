import { Tag } from '../reducer/types';

export const reverseTagChecked = (tags: Tag[], id: string): Tag[] =>
	tags.map(tag => (tag.id === id ? { ...tag, checked: !tag.checked } : tag));
