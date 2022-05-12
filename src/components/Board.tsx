import styled from '@emotion/styled';
import React from 'react';

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
	return <BoardContainer>{children}</BoardContainer>;
};

export default Board;
