import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const LoginScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ padding: '2rem', textAlign: 'center', color: theme.text }}>
            <h1 style={{ color: theme.primary }}>Login</h1>
            <p>Authentication is coming soon! You&apos;ll be able to login and manage your profile here.</p>
        </div>
    );
};

export default LoginScreen;