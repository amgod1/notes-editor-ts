import React, { FC } from 'react';
import useNotes from '../../context/NotesContext';
import { noteCount } from '../../helpers/noteCount';
import NoteItem from '../NoteItem/NoteItem';

const NotesList: FC = () => {
	const { filteredNotes, notes } = useNotes();

	return (
		<main className="main__wrapper">
			<h2>{`All notes ${noteCount(filteredNotes, notes)}:`}</h2>
			{filteredNotes.map(note => (
				<NoteItem key={note.id} note={note} />
			))}
		</main>
	);
};

export default NotesList;
