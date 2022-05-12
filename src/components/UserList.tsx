import { useStore } from '@/store/appStore';
import { postitColors } from '@/styles/colors';
import { contrast } from '@/utils/accessible-color';
import styled from '@emotion/styled';
import React from 'react';

const List = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row-reverse;
	height: 50px;
	margin-right: 20px;
`;

const UserList = () => {
	const { userList } = useStore();
	return (
		<List>
			{/* if userlist longer than 0, show only users whose socketId is not null */}
			{userList?.length > 0 &&
				userList
					.filter((user) => user._socketId !== null)
					.map((user, i) => <User key={i} content={user} />)}
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
	return (
		<UserIcon bgColor={content?.colors?.bgColor} fgColor={content?.colors?.fgColor}>
			<span>{firstLetter}</span>
		</UserIcon>
	);
};

export default UserList;
