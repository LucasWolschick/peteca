import { Navbar, Container } from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  return (
    <>
      <header>
        <nav className="background-container navbar navbar-expand-lg navbar-toggleable-sm navbar-light bg-light-gray border-bottom box-shadow">
          <div className="container-fluid position-relative">
            <a href="/">
              <Image src={"/logo.png"} alt="Peteca" width={145} height={48} />
              {/* <img src="/public/next.svg" alt="Peteca" height="30" /> */}
            </a>
            <div className="d-none d-sm-block ms-auto me-2">
              <p className="mb-0">Caio</p>
              <a className="mt-0 text-decoration-none text-dark">SAIR</a>
            </div>
            <div className="d-none d-sm-block">
              <FontAwesomeIcon icon={faCircleUser} color="black" size="3x" />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
