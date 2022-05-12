import styled from '@emotion/styled';
import React from 'react';

const List = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: row-reverse;
`;

const UserList = () => {
	return (
		<List>
			<User></User>
			<User></User>
			<User></User>
			<User></User>
		</List>
	);
};

const UserIcon = styled.div`
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
	background: #61f8c0;
	color: #1a202c;
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

const User = () => {
	return (
		<UserIcon>
			<span>R</span>
		</UserIcon>
	);
};

export default UserList;
