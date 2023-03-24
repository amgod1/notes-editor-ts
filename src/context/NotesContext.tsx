import {
	FC,
	createContext,
	useReducer,
	PropsWithChildren,
	useContext,
} from 'react';
import { findTagsArray } from '../helpers/findTags';
import { getUniqueTags } from '../helpers/getUniqueTags';
import { NotesReducer } from '../reducer/NotesReducer';
import { State } from '../reducer/types';
import NotesContextInterface from './NotesContext.interface';

const notes = localStorage.getItem('notes');

const initialState: State = {
	search: '',
	newNote: '',
	tags: notes ? getUniqueTags([], findTagsArray(JSON.parse(notes))) : [],
	notes: notes ? JSON.parse(notes) : [],
	filteredNotes: notes ? JSON.parse(notes) : [],
};

export default function useNotes() {
	return useContext(NotesContext);
}

const NotesContext = createContext<NotesContextInterface>({
	...initialState,
	filterNotes: () => {},
	addNote: () => {},
	onNoteChange: () => {},
	updateNote: () => () => {},
	filterTag: () => () => {},
	deleteNote: () => () => {},
	deleteAllNotes: () => {},
});

export const NotesContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(NotesReducer, useNotes());

	const filterNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SEARCH', payload: event.target.value });
	};

	const addNote = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch({ type: 'ADD_NOTE' });
	};

	const onNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'INPUT_NEW_NOTE', payload: event.target.value });
	};

	const updateNote =
		(id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
			dispatch({
				type: 'UPDATE_NOTE',
				payload: { id: id, content: event.target.value },
			});
		};

	const filterTag = (id: string) => () => {
		dispatch({ type: 'FILTER_TAG', payload: id });
	};

	const deleteNote = (id: string) => () => {
		dispatch({ type: 'DELETE_NOTE', payload: id });
	};

	const deleteAllNotes = () => {
		dispatch({ type: 'DELETE_ALL_NOTES' });
	};

	return (
		<NotesContext.Provider
			value={{
				search: state.search,
				newNote: state.newNote,
				tags: state.tags,
				notes: state.notes,
				filteredNotes: state.filteredNotes,
				filterNotes,
				deleteAllNotes,
				addNote,
				onNoteChange,
				updateNote,
				filterTag,
				deleteNote,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
};
