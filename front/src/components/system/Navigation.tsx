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

// The Navigation component is made of NavigationButton's, and it is used in the Header and Sidebar
// It has all the areas that the system has

export default function Navigation() {
  return (
    <>
      <NavigationButton icon={faHouse} text="Início" route="/system"/>
      <NavigationButton icon={faBox} text="Estoque" route="/system/estoque"/>
      <NavigationButton icon={faCircleUser} text="Usuários" route="/system/usuarios"/>
      <NavigationButton icon={faGear} text="Administração" route="/system/admin"/>
    </>
  );
}
