import { FC } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import useNotes from '../../context/NotesContext';

const Header: FC = () => {
	const { search, filterNotes, deleteAllNotes } = useNotes();
	return (
		<header className="header__wrapper">
			<input
				className="header__input"
				type="text"
				placeholder="Search"
				value={search}
				onChange={filterNotes}
			/>
			<button className="header__button" onClick={deleteAllNotes}>
				<AiOutlineDelete />
			</button>
		</header>
	);
};

export default Header;
