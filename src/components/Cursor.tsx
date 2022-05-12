import React from 'react';
import { ReactComponent as CursorIcon } from '@/assets/cursor.svg';
import styled from '@emotion/styled';

const CursorContainer = styled.div`
	svg {
		width: 20px;
		height: auto;
	}
`;

const Cursor = () => {
	return (
		<CursorContainer>
			<CursorIcon></CursorIcon>
		</CursorContainer>
	);
};

export default Cursor;
