import {
  faHouse,
  faChartLine,
  faBox,
  faFileLines,
  faCalendar,
  faCircleUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import NavigationButton from "../../items/system/NavigationButton";

export default function Navigation() {
  return (
    <>
      <NavigationButton icon={faHouse} text="Início" />
      <NavigationButton icon={faChartLine} text="Caixinha" />
      <NavigationButton icon={faBox} text="Estoque" />
      <NavigationButton icon={faFileLines} text="Documentos" />
      <NavigationButton icon={faCalendar} text="Calendário" />
      <NavigationButton icon={faCircleUser} text="Usuários" />
      <NavigationButton icon={faGear} text="Administração" />
    </>
  );
}

