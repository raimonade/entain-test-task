import React from 'react';

import { MoonIcon } from './moonicon';
import { SunIcon } from './sunicon';
import styled from '@emotion/styled';
import ThemeToggleContext from '@/providers/ThemeToggleContext';

const Button = styled.button<{ dark: boolean }>`
	margin: 1em;
	background: transparent;
	color: ${(props) => props.theme.color.text};
	border: none;

	svg {
		width: 1.5em;
		height: 1.5em;
	}
`;

export const ThemeModeToggler = () => {
	const { isDarkTheme, toggleTheme } = React.useContext(ThemeToggleContext);

	return (
		<Button onClick={toggleTheme} dark={isDarkTheme}>
			{isDarkTheme ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
};

export default ThemeModeToggler;
