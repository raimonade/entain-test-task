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
	const { focused, setFocused } = useStore();
	const [cursor, setCursor] = useState('default');

	useEffect(() => {
		if (focused) {
			setCursor('text');
			return;
		}
		setCursor('default');
	}, [focused]);

	const [notes, addNotes] = useState([]);
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
		addNotes([
			...notes,
			{
				text: '',
				x: e.clientX - 100,
				y: e.clientY - 100,
				colors: {
					bgColor: bg,
					fgColor: fg,
				},
			},
		]);
	};

	return (
		<BoardContainer onClick={createNewNote} cursor={cursor}>
			<Cursors></Cursors>
			{notes.map((note, i) => (
				<Note
					key={i}
					colors={note.colors}
					text={note.text}
					initialX={note.x}
					initialY={note.y}
				/>
			))}
		</BoardContainer>
	);
};

export default memo(Board);
