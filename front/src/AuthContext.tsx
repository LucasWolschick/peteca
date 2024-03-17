"use client";

// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextData {
 isLogged: boolean;
 setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
 user: any;
 setUser: React.Dispatch<React.SetStateAction<any>>;
 token: string;
 setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextData>({
 isLogged: false,
 setIsLogged: () => {},
 user: null,
 setUser: () => {},
    token: "",
    setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
            setIsLogged(true);
        }
    }, []);

 return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
 );
};
