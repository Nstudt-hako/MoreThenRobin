import React, { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const theme = isDark ? darkTheme : lightTheme;

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;
    }, [isDark, theme]);

    const toggleTheme = () => {
        setIsDark(prevIsDark => !prevIsDark);
    };

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};