import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// Simplified theme objects
const lightTheme = {
    primary: '#6200EE',
    background: '#F5F7FB',
    surface: '#FFFFFF',
    text: '#1C1F23',
    textSecondary: '#5A636E',
    error: '#D32F2F',
    accent: '#03A9F4',
    success: '#2E7D32',
    warning: '#ED6C02',
    border: '#E2E8F0',
    shadow: 'rgba(0,0,0,0.08)',
    gradient: 'linear-gradient(135deg,#6200EE 0%,#03A9F4 100%)'
};

const darkTheme = {
    primary: '#BB86FC',
    background: '#0D1117',
    surface: '#1E2530',
    text: '#F5F7FA',
    textSecondary: '#9BA3AF',
    error: '#EF5350',
    accent: '#29B6F6',
    success: '#66BB6A',
    warning: '#FFA726',
    border: '#2D3742',
    shadow: 'rgba(0,0,0,0.6)',
    gradient: 'linear-gradient(135deg,#3E1E68 0%,#2E4A7D 60%,#1A84B8 100%)'
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        let saved;
        try { saved = localStorage.getItem('theme'); } catch { /* ignore */ }
        if (saved) return saved === 'dark';
        if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
            try { return window.matchMedia('(prefers-color-scheme: dark)').matches; } catch { return false; }
        }
        return false; // default in non-browser (tests / SSR)
    });

    const theme = isDark ? darkTheme : lightTheme;

    useEffect(() => {
        const mode = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', mode);
        document.documentElement.setAttribute('data-theme', mode);
        // Map theme keys to CSS variables
        const root = document.documentElement;
        Object.entries(theme).forEach(([k,v]) => {
            root.style.setProperty(`--color-${k}`, v);
        });
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