import styled from '@emotion/styled';
import React from 'react';
// import ThemeToggle from '@/components/ThemeToggle';
import UserList from './UserList';

const Topbar = styled.nav`
	align-items: center;
	background: #ffffff;
	position: fixed;
	width: calc(100vw - 40px);
	z-index: 3;
	background: ${(props) => props.theme.color.background};
	height: 50px;
	box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
	padding: 0 20px;
`;

const Container = styled.div`
	display: flex;
	/* padding: 0 0 0 1em; */
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
	font-size: 14px;
	margin-right: auto;

	color: ${(props) => props.theme.color.text};
`;

const Navbar = () => {
	return (
		<Topbar>
			<Container>
				<Logo>CollabBoard</Logo>
				<UserList />
				{/* <ThemeToggle /> */}
			</Container>
		</Topbar>
	);
};

export default Navbar;
