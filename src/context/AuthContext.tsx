import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// This is a simple implementation. In a real app, you'd want to use a more secure method
const ADMIN_CREDENTIALS = {
    username: 'peshwan',
    password: 'modemboot@198811'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    const login = (inputUsername: string, password: string) => {
        if (inputUsername === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            setIsAuthenticated(true);
            setUsername(inputUsername);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
