import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// Simplified theme objects
const lightTheme = {
    primary: '#6200EE',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#757575',
    error: '#B00020'
};

const darkTheme = {
    primary: '#BB86FC',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    error: '#CF6679'
};

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