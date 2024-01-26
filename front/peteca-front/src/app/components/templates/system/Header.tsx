"use client";

import Image from "next/image";
import Navigation from "./Navigation";
import User from "../../items/system/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  function updateNavbar() {
    let el = document.getElementById("nav-header");

    if (el?.classList.contains("d-none")) el.classList.remove("d-none");
    else el?.classList.add("d-none");
  }

  return (
    <>
      <header>
        <nav className="d-flex flex-column navbar justify-content-center bg-light-gray">
          <div className="container-fluid align-items-center justify-content-between ms-2 ">
            <Image src={"/logo.svg"} alt="Peteca" width={145} height={48} />
            <User />
          </div>
          <div className="flex-row justify-content-center text-purple">
            <a
              onClick={() => {
                updateNavbar();
              }}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </a>
          </div>
          <ul
            className="d-flex flex-column ms-2 me-auto nav d-none"
            id="nav-header"
          >
            <Navigation />
          </ul>
        </nav>
      </header>
    </>
  );
}
