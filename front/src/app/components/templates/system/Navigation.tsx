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
import Home from "@/app/page";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// The Navigation component is made of NavigationButton's, and it is used in the Header and Sidebar
// It has all the areas that the system has

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
