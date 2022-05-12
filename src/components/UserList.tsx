import { useStore } from '@/store/appStore';
import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import styled from '@emotion/styled';
import React, { useEffect, useMemo } from 'react';
import Tooltip from '@/components/Tooltip';
import { usePersistentStore } from '@/store/persistentstore';

const List = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row-reverse;
	height: 50px;
	/* margin-right: 20px; */
`;

const UserList = () => {
	const { userList } = useStore();
	return (
		<List>
			{/* if userlist longer than 0, show only users whose socketId is not null */}
			{userList?.length > 0
				? userList
						.filter((user) => user._socketId !== null)
						.map((user, i) => <User key={i} content={user} />)
				: null}
		</List>
	);
};

const UserIcon = styled.div<{ bgColor: string; fgColor: string }>`
	border-radius: 9999px;
	border-width: 2px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	text-transform: uppercase;
	font-weight: 500;
	position: relative;
	flex-shrink: 0;
	background: ${(props) => props.bgColor};
	color: ${(props) => props.fgColor};
	border-color: #ffffff;
	vertical-align: top;
	width: 24px;
	height: 24px;
	margin-right: 0;
	font-size: 12px;

	margin-left: -8px;
	border: 3px solid ${(props) => props.theme.color.background};
	/* box-sizing: border-box; */

	span {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
`;

const User = ({ content }) => {
	const firstLetter = content?._name?.charAt(0);
	const { user } = usePersistentStore();
	useEffect(() => {
		if (content) {
			console.log('content', content);
			console.log('user', user);
		}
	}, [content]);

	const isYou = useMemo(() => {
		// if user is not null check if user._socketId is equal to content._socketId
		// content._socketId may be either string or array of strings
		// if array of strings, compare each string with user._socketId
		if (user && content) {
			if (Array.isArray(content._socketId)) {
				return content._socketId.includes(user.socketId);
			} else {
				return content._socketId === user.socketId;
			}
		} else {
			return false;
		}
	}, [user, content]);

	return (
		<Tooltip
			content={isYou ? `${content?._name} (you)` : content._name}
			offsetX={-5}
			offsetY={5}
		>
			<UserIcon bgColor={content?.colors?.bgColor} fgColor={content?.colors?.fgColor}>
				<span>{firstLetter}</span>
			</UserIcon>
		</Tooltip>
	);
};

export default UserList;
