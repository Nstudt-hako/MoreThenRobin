import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const AddCatchScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ padding: '2rem', textAlign: 'center', color: theme.text }}>
            <h1 style={{ color: theme.primary }}>Add New Catch</h1>
            <p>This feature is coming soon! You&apos;ll be able to add your fishing catches here.</p>
        </div>
    );
};

export default AddCatchScreen;