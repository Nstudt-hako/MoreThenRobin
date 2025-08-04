import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ padding: '2rem', textAlign: 'center', color: theme.text }}>
            <h1 style={{ color: theme.primary }}>Profile</h1>
            <p>Your profile management will be available here soon!</p>
        </div>
    );
};

export default ProfileScreen;