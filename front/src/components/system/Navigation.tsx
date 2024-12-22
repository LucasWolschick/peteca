import {
  faHouse,
  faChartLine,
  faBox,
  faFileLines,
  faCalendar,
  faCircleUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import NavigationButton from "./NavigationButton";
import { useContext } from "react";
import { AuthContext } from "@/AuthContext";

// The Navigation component is made of NavigationButton's, and it is used in the Header and Sidebar
// It has all the areas that the system has

export default function Navigation() {
  const userPermissions = useContext(AuthContext).loggedUser?.userPermissions;
  const isAdmin = userPermissions?.includes("admin");

  return (
    <>
      <NavigationButton icon={faHouse} text="Início" route="/system/inicio" />
      <NavigationButton icon={faBox} text="Estoque" route="/system/estoque" />
      <NavigationButton
        icon={faCircleUser}
        text="Usuários"
        route="/system/usuarios"
      />
      {isAdmin && (
        <NavigationButton
          icon={faGear}
          text="Administração"
          route="/system/admin"
        />
      )}
      <NavigationButton
        icon={faCalendar}
        text="Caixinha"
        route="/system/caixinha"
      />
    </>
  );
}
