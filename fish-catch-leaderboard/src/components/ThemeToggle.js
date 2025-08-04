import React, { useContext } from 'react';
import { Switch } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
        />
    );
};

export default ThemeToggle;