import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id,email,role }

    const login = async (email) => {
        // Simple role inference: emails ending with 'admin.test' become admin
        const role = email.endsWith('admin.test') ? 'admin' : 'user';
        setUser({ email, id: email, role });
        return Promise.resolve();
    };

    const logout = async () => {
        setUser(null);
        return Promise.resolve();
    };

    const register = async (email) => {
        const role = 'user';
        setUser({ email, id: email, role });
        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAdmin: user?.role === 'admin',
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};