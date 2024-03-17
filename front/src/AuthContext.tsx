// AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextData {
 isLogged: boolean;
 setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
 showToast2: boolean;
 setShowToast2: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextData>({
 isLogged: false,
 setIsLogged: () => {},
 showToast2: false,
    setShowToast2: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [isLogged, setIsLogged] = useState(false);
 const [showToast2, setShowToast2] = useState(false);

 return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, showToast2, setShowToast2 }}>
            {children}
        </AuthContext.Provider>
 );
};
