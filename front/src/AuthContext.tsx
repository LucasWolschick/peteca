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

// undefined if indeterminate, null if not logged, LoginData if logged
interface AuthContextData {
  loggedUser: LoginData | null | undefined;
  setLoggedUser: React.Dispatch<
    React.SetStateAction<LoginData | null | undefined>
  >;
}

export const AuthContext = createContext<AuthContextData>({
  loggedUser: undefined,
  setLoggedUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState(
    undefined as LoginData | null | undefined
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (loggedUser === undefined) {
      if (!token) {
        // not logged in
        setLoggedUser(null);
      } else {
        // attempt to log in
        let user = UsuarioAPI.getLoggedUser()
          .then((response) => {
            const user = {
              id: response.data.id,
              nome: response.data.nome,
              email: response.data.email,
            };
            localStorage.setItem("token", token);
            setLoggedUser({ token, user: user });
          })
          .catch((error) => {
            localStorage.removeItem("token");
            setLoggedUser(null);
          });
      }
    } else if (loggedUser === null) {
      // not logged in, make sure we sync with localStorage
      localStorage.removeItem("token");
    } else {
      if (!token) {
        // logged in, but no token in localStorage
        localStorage.setItem("token", loggedUser.token);
      }
    }
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
