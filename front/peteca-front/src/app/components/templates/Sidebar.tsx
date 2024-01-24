import {
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
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-secondary card-img-overlay col-3">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="">
            <a
              href="#"
              className="nav-link text-white active justify-content-between d-flex align-items-center"
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
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
