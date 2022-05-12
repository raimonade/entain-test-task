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
				console.log(state.cursors);
			});
		},
		setError: (errorType: string, error: string) =>
			set((state) => {
				state.errors[errorType] = error;
			}),
	} as IAppStore);

export const useStore = create(devtools(subscribeWithSelector(store)));
