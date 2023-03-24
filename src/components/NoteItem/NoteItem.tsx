import React, { FC, useState, useRef, useEffect } from 'react';
import { FiDelete as DeleteIcon } from 'react-icons/fi';
import { GrUpdate as UpdateIcon } from 'react-icons/gr';
import { MdDone as DoneIcon } from 'react-icons/md';
import useNotes from '../../context/NotesContext';
import NoteItemProps from './NoteItem.interface';

const highlightText = (note: string) => {
	const words = note.split(' ');
	const highlightedWords = words.map((word, index) => {
		if (word.includes('#')) {
			const [classicPart, boldPart] = [
				word.replace(word.slice(word.indexOf('#')), ''),
				word.slice(word.indexOf('#')),
			];
			return (
				<React.Fragment key={index}>
					{classicPart}
					<b>{boldPart}</b>{' '}
				</React.Fragment>
			);
		} else {
			return <React.Fragment key={index}>{word} </React.Fragment>;
		}
	});
	return <>{highlightedWords}</>;
};

const NoteItem: FC<NoteItemProps> = ({ note }) => {
	const { updateNote, deleteNote } = useNotes();
	const [change, setChange] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const showInput = () => {
		setChange(prev => !prev);
	};

	useEffect(() => {
		if (change) {
			inputRef.current?.focus();
		}
	}, [change]);

	return (
		<div className="main__item" key={note.id}>
			{change ? (
				<input
					className="main__item-input"
					value={note.content}
					onChange={updateNote(note.id)}
					onBlur={showInput}
					ref={inputRef}
				/>
			) : (
				<p>{highlightText(note.content)}</p>
			)}
			<div className="main__item-buttons">
				<button className="main__item-button" onClick={showInput}>
					{change ? <DoneIcon /> : <UpdateIcon />}
				</button>
				<button className="main__item-button" onClick={deleteNote(note.id)}>
					<DeleteIcon />
				</button>
			</div>
		</div>
	);
};

export default NoteItem;
