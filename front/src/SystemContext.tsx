import { createContext, useContext, useEffect, useState } from "react";
import { SystemAPI } from "./apis/systemAPI";
import { Permission } from "./apis/permissionsAPI";
import { AuthContext } from "./AuthContext";

interface SystemContextData {
  permissions: Permission[];
  color: string;
}

export const SystemContext = createContext<SystemContextData>({
  permissions: [],
  color: "azul",
});

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loggedUser } = useContext(AuthContext);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [color, setColor] = useState("azul");

  useEffect(() => {
    if (loggedUser === undefined || loggedUser === null) {
      return;
    }
    SystemAPI.getConfigurations()
      .then((response) => {
        setPermissions(response.data.permissoes);
        setColor(response.data.cor);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loggedUser]);

  return (
    <SystemContext.Provider
      value={{
        permissions,
        color,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};
