import { useConnect } from '@/providers/ConnectProvider';
import { useStore } from '@/store/appStore';
import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import styled from '@emotion/styled';
import React, { memo, useEffect, useRef, useState } from 'react';
import Cursors from './Cursors';
import { v4 as uuidv4 } from 'uuid';
import Note from './Note';
import { usePersistentStore } from '@/store/persistentstore';
import ClientNoteData from '@/models/clientNoteData';
import shallow from 'zustand/shallow';

const BoardContainer = styled.div<{ cursor: string }>`
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 600px;
	min-height: 400px;
	/* padding: 70px 20px; */
	width: 100%;
	height: 100%;
	cursor: ${({ cursor }) => cursor};
`;

function Component({ index, onNoteUpdate, onNoteRemove }) {
	const dataRef = useRef(useStore.getState().notes[index]);
	// Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
	useEffect(() => useStore.subscribe((state) => (dataRef.current = state.notes[index])), []);
	return (
		<Note content={dataRef.current} onNoteRemove={onNoteRemove} onNoteUpdate={onNoteUpdate} />
	);
	// return <div>NOTE</div>;
}

const Board = () => {
	const { socketRef } = useConnect();
	const { focused, setFocused, removeNote, addNote } = useStore(
		(state) => ({
			focused: state.focused,
			setFocused: state.setFocused,
			addNote: state.addNote,
			removeNote: state.removeNote,
		}),
		shallow
	);
	const notes = useStore((state) => state.notes);
	const [cursor, setCursor] = useState('default');
	const { user } = usePersistentStore();
	// console.log('notes', notes);

	// const noteRef = useRef(useStore.getState().notes);

	useEffect(() => {
		if (focused) {
			setCursor('text');
			return;
		}
		setCursor('default');
	}, [focused]);

	// const createNewNote = (position:Coords, colour: string) => {
	const onNoteRemove = (id) => {
		removeNote(id);
		socketRef.current.emit('newNote', id);
	};

	const createNewNote = (e) => {
		// // add lorem ipsum object to notes
		console.log(focused);
		if (e.target !== e.currentTarget) {
			return;
		}
		if (focused) {
			setFocused(false);
			return;
		}
		const bg =
			Object.values(postitColors)[
				Math.floor(Math.random() * Object.values(postitColors).length)
			];
		const fg = contrast(bg);
		const data = {
			id: uuidv4(),
			position: {
				x: e.clientX - 100,
				y: e.clientY - 100,
			},
			colors: {
				bgColor: bg,
				fgColor: fg,
			},
			text: '',
			owner: user.username,
		};
		addNote(data);
		socketRef.current.emit('newNote', {
			data,
		});
	};

	const onNoteUpdate = async (data: ClientNoteData) => {
		// updateNote(data);
		console.log(data);
		socketRef.current.emit('onNoteUpdate', {
			data,
		});
	};

	// Connect to the store on mount, disconnect on unmount, catch state-changes in a reference

	return (
		<BoardContainer onClick={createNewNote} cursor={cursor}>
			<Cursors></Cursors>
			{notes?.map((note, i) => (
				<Component
					onNoteRemove={onNoteRemove}
					onNoteUpdate={onNoteUpdate}
					key={note.id}
					index={i}
				/>
				// <h1 key={i}>NOTE</h1>
			))}
		</BoardContainer>
	);
};

export default memo(Board);
// export default Board;
