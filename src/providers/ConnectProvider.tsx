import ClientUser from '@/models/clientUser';
import { useStore } from '@/store/appStore';
import { usePersistentStore } from '@/store/persistentstore';
// import axios from 'axios';
import React, { useContext, useState, createContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
// import { useModal } from './ModalProvider';

const ConnectContext = createContext({
	connected: false,
	socketRef: null,
});

export const ConnectConsumer = ConnectContext;

export const useConnect = () => {
	const context = useContext(ConnectContext);

	if (context === undefined) {
		throw new Error('ConnectContext cannot be used outside of ConnectProvider');
	}
	return context;
};

export const ConnectProvider = ({ children }) => {
	// const [state, setState] = useState({ component: null, props: null });
	const [connected, setConnected] = useState<boolean>(false);
	const { setCursors, setNotes, removeNote, updateNote, addNote, setUserList } = useStore();
	const { user, updateUser } = usePersistentStore();
	const socketRef = useRef(null);
	// @ts-ignore
	const { username: savedName, setUsername } = usePersistentStore();
	// const { hideModal } = useModal();

	useEffect(() => {
		console.log('UseEffect');
		if (!connected && user.username) {
			console.log('Attempting Socket Connection...');
			// connect to socket server
			console.log('process.env.SOCKET_URL', process.env.SOCKET_URL);
			socketRef.current = io(process.env.SOCKET_URL, {});

			// log socket connection
			socketRef.current.on('connect', () => {
				console.log('SOCKET CONNECTED!', socketRef.current.id);
				setConnected(true);
				updateUser('socketId', socketRef.current.id);
				console.log('ONJOIN EMITTING...');
				socketRef.current.emit('onJoin', user?.username);
			});
			socketRef.current.on('users', (userList: ClientUser[]) => {
				console.log('Got Users!', userList);
				setUserList(userList);
			});
			socketRef.current.on('cursors', (cursors: any) => {
				console.log('Got Cursors!', cursors);
				const filteredCursors = cursors.filter((cursor: any) => {
					return cursor.socketId !== user.socketId;
				});
				setCursors(filteredCursors);
			});
			socketRef.current.on('notes', (notes: any) => {
				console.log('Got Notes!', notes);
				setNotes(notes);
			});
			socketRef.current.on('onnewnote', (note: any) => {
				console.log('Got New Note!', note);
				addNote(note);
			});
			socketRef.current.on('onnoteupdate', (note: any) => {
				console.log('Note Update!', note);
				updateNote(note);
			});
			socketRef.current.on('onnoteremove', (id: string) => {
				console.log('Note NoteRemove!', id);
				removeNote(id);
			});

			// 	// update chat on new message dispatched
			// 	socket.on("message", (message: IMsg) => {
			// 	  chat.push(message);
			// 	  setChat([...chat]);
			// 	});
			if (socketRef.current) return () => socketRef.current.disconnect();
		}
	}, [user.username]);

	// const sendMessage = async () => {
	// 	if (msg) {
	// 	  // build message obj
	// 	  const message: IMsg = {
	// 		user,
	// 		msg
	// 	  };

	// 	  // dispatch message to other users
	// 	  const resp = await fetch("/api/chat", {
	// 		method: "POST",
	// 		headers: {
	// 		  "Content-Type": "application/json"
	// 		},
	// 		body: JSON.stringify(message)
	// 	  });

	// 	  // reset field if OK
	// 	  if (resp.ok) setMsg("");
	// 	}

	// 	// focus after click
	// 	inputRef?.current?.focus();
	//   };

	const contextValue = {
		socketRef,
		connected,
	};

	return <ConnectContext.Provider value={contextValue}>{children}</ConnectContext.Provider>;
};
