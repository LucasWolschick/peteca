import {
  faHouse,
  faChartLine,
  faBox,
  faFileLines,
  faCalendar,
  faCircleUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import NavigationButton from "../items/NavigationButton";

export default function Navigation(props: NavigationProps) {
  return (
    <>
      <NavigationButton icon={faHouse} text="Início" transparent={props.text} />
      <NavigationButton
        icon={faChartLine}
        text="Caixinha"
        transparent={props.text}
      />
      <NavigationButton icon={faBox} text="Estoque" transparent={props.text} />
      <NavigationButton
        icon={faFileLines}
        text="Documentos"
        transparent={props.text}
      />
      <NavigationButton
        icon={faCalendar}
        text="Calendário"
        transparent={props.text}
      />
      <NavigationButton
        icon={faCircleUser}
        text="Usuários"
        transparent={props.text}
      />
      <NavigationButton
        icon={faGear}
        text="Administração"
        transparent={props.text}
      />
    </>
  );
}

export interface NavigationProps {
  text: boolean;
}
