import React from 'react';

const ThemeToggleContext = React.createContext({
	toggleTheme: () => {},
	isDarkTheme: false,
});

export default ThemeToggleContext;
