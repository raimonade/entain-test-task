import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface IpersistantStore {
	user: {
		username: string;
		socketId: string;
		color: string;
	};
	updateUser: (prop: string, value: string) => void;
}

export const usePersistentStore = create<IpersistantStore>(
	persist(
		(set, _) => ({
			user: {
				username: null,
				socketId: null,
				color: null,
			},
			updateUser(prop, value) {
				set((state) => {
					state.user[prop] = value;
				});
			},
		}),
		{
			name: 'entain_test_task', // unique name
			// for now setting it as sessionStorage for testing
			// getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
			getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
		}
	)
);
