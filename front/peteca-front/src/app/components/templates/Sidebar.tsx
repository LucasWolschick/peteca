import {
  faBars,
  faBox,
  faCalendar,
  faChartLine,
  faCircleUser,
  faFileLines,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar open sidebar-sticky background-container bg-dark-gray col-2">
        <div
          className="d-flex justify-content-center align-items-center text-white fa-2x py-3 d-none"
          id="sidebar-handle"
        >
          <FontAwesomeIcon icon={faBars} className="d-none"></FontAwesomeIcon>
        </div>
        <ul className="nav nav-pills nav-flush flex-column mb-auto p-4">
          <li className="">
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faHouse} size="2x" />
              Início{" "}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faChartLine} size="2x" />
              Caixinha{" "}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faBox} size="2x" />
              Estoque
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faFileLines} size="2x" />
              Documentos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faCalendar} size="2x" />
              Calendário
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faCircleUser} size="2x" />
              Usuários
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link text-white justify-content-between d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faGear} size="2x" />
              Administração
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
