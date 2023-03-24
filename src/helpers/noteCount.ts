import { Note } from '../reducer/types';

export const noteCount = (filteredNotes: Note[], notes: Note[]): string =>
	notes ? `(${filteredNotes.length}/${notes.length})` : '';
