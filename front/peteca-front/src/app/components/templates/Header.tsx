import { Navbar, Container } from "react-bootstrap";
import Image from 'next/image'
export default function Header() {
  return (
    <>
      <header>
        <nav className="background-container navbar navbar-expand-lg navbar-toggleable-sm navbar-light bg-light-gray border-bottom box-shadow">
          <div className="container-fluid position-relative">
            <a href="/" > 
            <Image src={'/logo.png'} alt='Peteca' width={145} height={48} />
              {/* <img src="/public/next.svg" alt="Peteca" height="30" /> */}
            </a>
            <div className="collapse navbar-collapse">
              <div className="text-end ms-auto">Feliz aniversário Caio!</div>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src=""
                      width="38"
                      height="38"
                      alt="Avatar"
                      className="rounded-circle shadow-4"
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="user-dropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="">
                        <i className="fas fa-power-off"></i>
                        Sair
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
