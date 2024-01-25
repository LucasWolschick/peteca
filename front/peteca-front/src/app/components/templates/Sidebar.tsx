import {
  faBars,
  faBox,
  faCalendar,
  faChartLine,
  faCircle,
  faCircleUser,
  faFileLines,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationButton from "../items/NavigationButton";
import Image from "next/image";
import Navigation from "./Navigation";
import User from "../items/User";

export default function Sidebar() {
  return (
    <>
      <aside className="d-flex flex-column sidebar open sidebar-sticky background-container min-vh-100 bg-light-gray col-12 p-3">
        <div className="d-flex justify-content-center align-self-center p-3">
          <Image src={"/logo.png"} alt="Peteca" width={145} height={48} />
        </div>

        <hr className="text-purple"></hr>
        <ul className="nav nav-pills nav-flush flex-column mb-auto">
          <Navigation text={true}></Navigation>
        </ul>

        <div className="d-flex justify-content-start">
          <User />
        </div>
      </aside>
    </>
  );
}
