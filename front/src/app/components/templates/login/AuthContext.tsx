// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextData {
 isLogged: boolean;
 setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextData>({
 isLogged: false,
 setIsLogged: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [isLogged, setIsLogged] = useState(false);

 return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
 );
};
