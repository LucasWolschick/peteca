// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { UsuarioAPI } from "./apis/usuarioAPI";

interface LoginData {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
  };
}

interface AuthContextData {
  loggedUser: LoginData | null;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoginData | null>>;
}

const AuthContext = createContext<AuthContextData>({
  loggedUser: null,
  setLoggedUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState(null as LoginData | null);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !loggedUser) {
      let user = UsuarioAPI.getLoggedUser().then((response) => {
        const user = {
          id: response.data.user.id,
          nome: response.data.user.nome,
          email: response.data.user.email,
        };
        setLoggedUser({ token: response.data.token.token, user: user });
        localStorage.setItem("token", response.data.token.token);
      }).catch((error) => {
        localStorage.removeItem("token");
      });
    } else if (!token && loggedUser) {
      localStorage.setItem("token", loggedUser.token);
    }
  });

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
