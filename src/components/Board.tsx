import useMousePosition from '@/hooks/useMousePosition';
import { useConnect } from '@/providers/ConnectProvider';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import Cursor from './Cursor';

const BoardContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	min-width: 600px;
	min-height: 400px;
	padding: 70px 20px;
	width: 100%;
	height: 100%;
`;

const Board = ({ children }) => {
	const { socketRef } = useConnect();
	const { x, y } = useMousePosition();

	useEffect(() => {
		if (socketRef.current) {
			const element = { coords: { x, y }, status: 'default', socketId: socketRef.current.id };
			socketRef.current.emit('onMouseUpdate', element);
		}
	}, [socketRef.current, x, y]);

	return (
		<BoardContainer>
			{children}
			<Cursor></Cursor>
			<Cursor></Cursor>
			<Cursor></Cursor>
			<Cursor></Cursor>
			<Cursor></Cursor>
			<Cursor></Cursor>
			<Cursor></Cursor>
		</BoardContainer>
	);
};

export default Board;
