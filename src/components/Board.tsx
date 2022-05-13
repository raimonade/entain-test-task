import useMousePosition from '@/hooks/useMousePosition';
import { useConnect } from '@/providers/ConnectProvider';
import { useStore } from '@/store/appStore';
import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import styled from '@emotion/styled';
import React, { memo, useEffect, useState } from 'react';
import Cursor from './Cursor';
import Cursors from './Cursors';
import Note from './Note';

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

const Board = () => {
	const { socketRef } = useConnect();
	const { focused, notes, setFocused } = useStore();
	const [cursor, setCursor] = useState('default');
	const [items, setItems] = useState(notes);
	// dont merge items, create a completely seperate item
	useEffect(() => {
		if (focused) {
			setCursor('text');
			return;
		}
		setCursor('default');
	}, [focused]);

	useEffect(() => {
		if (notes) {
			setItems(notes);
			return;
		}
	}, [notes]);

	const onNoteCreate = async (text, x, y, colors, user) => {
		console.log('NEW NOTE');
		socketRef.current.emit('newNote', {
			text: text,
			position: {
				x,
				y,
			},
			colors: {
				fgColor: colors.fgColor,
				bgColor: colors.bgColor,
			},
			owner: user.username,
		});
	};

	const onNoteUpdate = async () => {};

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
		setItems([
			...items,
			{
				text: '',
				_position: {
					x: e.clientX - 100,
					y: e.clientY - 100,
				},
				_colors: {
					bgColor: bg,
					fgColor: fg,
				},
				owner: '',
			},
		]);
	};

	return (
		<BoardContainer onClick={createNewNote} cursor={cursor}>
			<Cursors></Cursors>
			{items?.map((note, i) => (
				<Note
					key={i}
					colors={note._colors}
					text={note.text}
					initialX={note._position.x}
					initialY={note._position.y}
					ownerName={note.owner}
					onNoteCreate={onNoteCreate}
					onNoteUpdate={onNoteUpdate}
				/>
			))}
		</BoardContainer>
	);
};

export default memo(Board);
