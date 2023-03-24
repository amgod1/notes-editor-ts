import ReactDOM from 'react-dom/client';
import { NotesContextProvider } from './context/NotesContext';
import App from './App';
import 'normalize-scss';
import './App.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<NotesContextProvider>
		<App />
	</NotesContextProvider>
);
