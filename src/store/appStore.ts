import ClientCursorData from '@/models/clientCursorData';
import ClientUser from '@/models/clientUser';
import create from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

export interface IAppStore {
	errors: {
		username: string;
		server: string;
	};
	focused: boolean;
	setFocused: (boolean: boolean) => void;
	notes: any;
	cursors: any;
	setNotes(notes: any): void;
	removeNote(note: any): void;
	addNote(note: any): void;
	updateNote(note: any): void;
	setCursors(cursors: any): void;
	updateCursor(data: ClientCursorData): void;
	userList: ClientUser[];
	setUserList: (users: ClientUser[]) => void;
	setError: (errorType, message: string) => void;
}

const store = (set) =>
	({
		focused: false,
		setFocused: (boolean: boolean) => {
			set((state) => {
				state.focused = boolean;
			});
		},
		errors: {
			username: null,
			server: null,
		},
		userList: null,
		cursors: [
			{
				coords: {
					x: 318,
					y: 447,
				},
				socketId: 'byNJoSsjdbr_KoELAAAo',
				x: 848,
			},
		],
		setUserList: (users: ClientUser[]) => {
			set((state) => {
				state.userList = users;
			});
		},
		setCursors: (cursors: any) => {
			set((state) => {
				state.cursors = cursors;
			});
		},
		removeNote: (id: any) => {
			set((state) => {
				// find index of note matching id
				const index = state.notes.findIndex((note) => note.id === id);
				if (index > -1) {
					state.notes.splice(index, 1);
				}
			});
		},
		setNotes: (notes: any) => {
			set((state) => {
				state.notes = notes;
			});
		},
		addNote: (note: any) => {
			set((state) => {
				if (state.notes?.length > 0) {
					state.notes.push(note);
				} else {
					state.notes = [note];
				}
			});
		},
		updateNote: (note: any) => {
			set((state) => {
				const index = state.notes.findIndex((n) => n.id === note.id);
				if (index > -1) {
					// console.log(index);
					state.notes[index].text = note.text;
					state.notes[index].colors = note.colors;
					state.notes[index].position = note.position;
				}
			});
		},
		updateCursor: (data: ClientCursorData) => {
			set((state) => {
				// find the cursor with the same id then change the data
				const cursor = state?.cursors?.findIndex((c) => c.socketId === data.socketId);
				if (cursor > -1) {
					state.cursors[cursor].coords.x = data.coords.x;
					state.cursors[cursor].coords.y = data.coords.y;
				}
				// if cursor is missing, create one
				else {
					if (state.cursors?.length > 0) {
						state.cursors.push(data);
					} else {
						state.cursors = [data];
					}
				}
			});
		},
		setError: (errorType: string, error: string) =>
			set((state) => {
				state.errors[errorType] = error;
			}),
	} as IAppStore);

export const useStore = create(devtools(subscribeWithSelector(store)));
