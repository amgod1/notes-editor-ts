export type State = {
	search: string;
	newNote: string;
	tags: Tag[];
	notes: Note[];
	filteredNotes: Note[];
};

export type Action =
	| { type: 'SEARCH'; payload: string }
	| { type: 'FILTER_TAG'; payload: string }
	| { type: 'INPUT_NEW_NOTE'; payload: string }
	| { type: 'ADD_NOTE' }
	| { type: 'UPDATE_NOTE'; payload: Note }
	| { type: 'DELETE_NOTE'; payload: string }
	| { type: 'DELETE_ALL_NOTES' };

export type Note = {
	id: string;
	content: string;
};

export type Tag = {
	id: string;
	tag: string;
	checked: boolean;
};
