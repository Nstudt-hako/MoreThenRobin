import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email) => {
        // Mock login for demo purposes
        setUser({ email, id: 'demo-user' });
        return Promise.resolve();
    };

    const logout = async () => {
        setUser(null);
        return Promise.resolve();
    };

    const register = async (email) => {
        // Mock register for demo purposes
        setUser({ email, id: 'demo-user' });
        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};