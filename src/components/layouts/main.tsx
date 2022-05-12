import React from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@emotion/react';
import ThemeToggleContext from '@/providers/ThemeToggleContext';
import { darkTheme, lightTheme } from '@/styles/theme';

import styled from '@emotion/styled';
import { useDarkMode } from 'usehooks-ts';
import DotGrid from '../DotGrid';
import Navbar from '@/components/Navbar';

const StyledMain = styled.main`
	// margin-top: 5em;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const MainLayoutContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.color.text};
`;

function MainLayout(props: any) {
	const darkMode = useDarkMode(false);
	const currentTheme = darkMode.isDarkMode ? darkTheme : lightTheme;

	const [isMounted, setIsMounted] = React.useState(false);
	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<>
			<Head>
				<title>Entain Test Task</title>
			</Head>
			<ThemeProvider theme={currentTheme}>
				{isMounted && (
					<ThemeToggleContext.Provider
						value={{
							isDarkTheme: darkMode.isDarkMode,
							toggleTheme: darkMode.toggle,
						}}
					>
						<DotGrid />

						<Navbar />
						<MainLayoutContainer>
							<StyledMain>{props.children}</StyledMain>
						</MainLayoutContainer>
					</ThemeToggleContext.Provider>
				)}
			</ThemeProvider>
		</>
	);
}

export default MainLayout;
