import { FC } from 'react';
import AddNote from './components/AddNote/AddNote';
import Header from './components/Header/Header';
import NotesList from './components/NotesList/NotesList';
import Tags from './components/Tags/Tags';

const App: FC = () => (
	<div className="app">
		<Header />
		<AddNote />
		<Tags />
		<NotesList />
	</div>
);

export default App;
