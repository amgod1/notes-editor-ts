import { Note, Tag } from './../reducer/types';

export const filterNotesByTags = (notes: Note[], tags: Tag[]): Note[] => {
	const checkedTags = tags.filter(tag => tag.checked);

	return checkedTags.length
		? notes.filter(note =>
				checkedTags.some(tag => note.content.includes(tag.tag))
		  )
		: notes;
};
