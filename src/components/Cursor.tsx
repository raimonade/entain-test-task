import React, { memo, useMemo } from 'react';
import { ReactComponent as CursorIcon } from '@/assets/cursor.svg';
import styled from '@emotion/styled';
import { useStore } from '@/store/appStore';

const CursorContainer = styled.div<{ bgColor: string; fgColor: string; x: number; y: number }>`
	position: absolute;
	display: flex;
	align-items: flex-end;
	transform: translate(${(props) => props.x}px, ${(props) => props.y}px);
	--bg-color: ${(props) => props.bgColor};
	--fg-color: ${(props) => props.fgColor};
	svg {
		width: 20px;
		height: auto;
		stroke-width: 1px;
		stroke: var(--fg-color);
		path {
			fill: var(--bg-color);
		}
	}
	pointer-events: none;
`;

const Username = styled.span`
	display: flex;
	font-size: 12px;
	font-weight: 500;
	color: var(--fg-color);
	background-color: var(--bg-color);
	padding: 5px;
	margin-bottom: -20px;
	margin-left: -10px;
`;

const Cursor = ({ content }) => {
	const { userList } = useStore();
	const matchingUser = useMemo(() => {
		// find a matching user object in userlist array with content.socketId,
		// users socketId might be a string or an array
		const matchingUser = userList?.find((user) => {
			if (Array.isArray(user._socketId)) {
				return user._socketId.includes(content.socketId);
			}
			return user._socketId === content.socketId;
		});
		return matchingUser;
	}, [userList, content.socketId]);

	return (
		<CursorContainer
			x={content?.coords?.x}
			y={content?.coords?.y}
			bgColor={matchingUser?.colors?.bgColor}
			fgColor={matchingUser?.colors?.fgColor}
		>
			<CursorIcon></CursorIcon>
			{matchingUser && <Username>{matchingUser._name}</Username>}
		</CursorContainer>
	);
};

export default memo(Cursor);
