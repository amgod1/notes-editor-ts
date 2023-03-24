import { State } from '../reducer/types';

export default interface NotesContext extends State {
	filterNotes: (event: React.ChangeEvent<HTMLInputElement>) => void;
	addNote: (event: React.FormEvent<HTMLFormElement>) => void;
	onNoteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	updateNote: (
		id: string
	) => (event: React.ChangeEvent<HTMLInputElement>) => void;
	filterTag: (id: string) => () => void;
	deleteNote: (id: string) => () => void;
	deleteAllNotes: () => void;
}
