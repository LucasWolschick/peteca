"use client";

import Image from "next/image";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import User from "./User";

export default function Header() {
  // The useState here is used to open/close the header below

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // The header below only appears when it is a mobile device, otherwise, shows a sidebar
  return (
    <>
      <header>
        <nav className="d-flex flex-column navbar justify-content-center bg-light-gray">
          <div className="container-fluid align-items-center justify-content-between">
            <Image src={"/logo.svg"} alt="Peteca" width={145} height={48} />
            <User />
          </div>
          <div className="flex-row justify-content-center text-purple">
            <a
              onClick={() => {
                handleClick();
              }}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </a>
          </div>
          <ul
            className={
              isOpen ? "d-flex flex-column ms-2 me-auto nav" : "d-none"
            }
          >
            <Navigation />
          </ul>
        </nav>
      </header>
    </>
  );
}
