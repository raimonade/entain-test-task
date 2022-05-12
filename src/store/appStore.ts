import ClientUser from '@/models/clientUser';
import create from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

export interface IAppStore {
	errors: {
		username: string;
		server: string;
	};

	notes: any;
	cursors: any;
	setNotes(notes: any): void;
	setCursors(cursors: any): void;
	userList: ClientUser[];
	setUserList: (users: ClientUser[]) => void;
	setError: (errorType, message: string) => void;
}

const store = (set) =>
	({
		errors: {
			username: null,
			server: null,
		},
		userList: null,
		cursors: null,
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
		setError: (errorType: string, error: string) =>
			set((state) => {
				state.errors[errorType] = error;
			}),
	} as IAppStore);

export const useStore = create(devtools(subscribeWithSelector(store)));
