import { reverseTagChecked } from './../helpers/reverseTagChecked';
import { getUniqueTags } from './../helpers/getUniqueTags';
import { findTagsArray, findTagsString } from '../helpers/findTags';
import { State, Action } from './types';
import { filterNotesByTags } from '../helpers/filterNotesByTags';

const notes = localStorage.getItem('notes');

export const initialState: State = {
	search: '',
	newNote: '',
	tags: notes ? getUniqueTags([], findTagsArray(JSON.parse(notes))) : [],
	notes: notes ? JSON.parse(notes) : [],
	filteredNotes: notes ? JSON.parse(notes) : [],
};

export const NotesReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SEARCH': {
			const filteredNotes = state.notes.filter(note =>
				note.content.includes(action.payload)
			);

			return {
				search: action.payload,
				newNote: state.newNote,
				tags: state.tags,
				notes: state.notes,
				filteredNotes: filterNotesByTags(filteredNotes, state.tags),
			};
		}
		case 'FILTER_TAG': {
			const newTags = reverseTagChecked(state.tags, action.payload);

			const filteredNotes = state.notes.filter(note =>
				note.content.includes(state.search)
			);

			return {
				search: state.search,
				newNote: state.newNote,
				tags: newTags,
				notes: state.notes,
				filteredNotes: filterNotesByTags(filteredNotes, newTags),
			};
		}
		case 'INPUT_NEW_NOTE': {
			const filteredNotes = state.notes.filter(note =>
				note.content.includes(state.search)
			);

			return {
				search: state.search,
				newNote: action.payload,
				tags: state.tags,
				notes: state.notes,
				filteredNotes: filterNotesByTags(filteredNotes, state.tags),
			};
		}
		case 'ADD_NOTE': {
			const newNotes = [
				...state.notes,
				{ id: crypto.randomUUID(), content: state.newNote },
			];

			const newTags = getUniqueTags(state.tags, [
				...state.tags,
				...findTagsString(state.newNote),
			]);

			const filteredNotes = newNotes.filter(note =>
				note.content.includes(state.search)
			);

			localStorage.setItem('notes', JSON.stringify(newNotes));

			return {
				search: state.search,
				newNote: '',
				tags: newTags,
				notes: newNotes,
				filteredNotes: filterNotesByTags(filteredNotes, newTags),
			};
		}
		case 'UPDATE_NOTE': {
			const newNotes = state.notes
				.map(note => (note.id === action.payload.id ? action.payload : note))
				.filter(note => note.content !== '');

			const newTags = getUniqueTags(state.tags, findTagsArray(newNotes));

			const filteredNotes = newNotes.filter(note =>
				note.content.includes(state.search)
			);

			localStorage.setItem('notes', JSON.stringify(newNotes));

			return {
				search: state.search,
				newNote: state.newNote,
				tags: newTags,
				notes: newNotes,
				filteredNotes: filterNotesByTags(filteredNotes, newTags),
			};
		}
		case 'DELETE_NOTE': {
			const newNotes = state.notes.filter(note => note.id !== action.payload);

			const newTags = getUniqueTags(state.tags, findTagsArray(newNotes));

			const filteredNotes = newNotes.filter(note =>
				note.content.includes(state.search)
			);

			localStorage.setItem('notes', JSON.stringify(newNotes));

			return {
				search: state.search,
				newNote: state.newNote,
				tags: newTags,
				notes: newNotes,
				filteredNotes: filterNotesByTags(filteredNotes, newTags),
			};
		}
		case 'DELETE_ALL_NOTES': {
			localStorage.removeItem('notes');

			return {
				search: '',
				newNote: '',
				tags: [],
				notes: [],
				filteredNotes: [],
			};
		}
		default:
			return state;
	}
};
