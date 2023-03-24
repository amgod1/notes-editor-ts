import { FC } from 'react';
import useNotes from '../../context/NotesContext';

const AddNote: FC = () => {
	const { newNote, onNoteChange, addNote } = useNotes();
	return (
		<section className="add-note__wrapper">
			<h1>Add note:</h1>
			<form onSubmit={addNote}>
				<input
					type="text"
					className="form__input"
					value={newNote}
					onChange={onNoteChange}
					placeholder="Create new note"
				/>
				<button type="submit" className="form__button">
					ADD
				</button>
			</form>
		</section>
	);
};

export default AddNote;
