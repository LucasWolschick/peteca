"use client";

import Image from "next/image";
import Navigation from "./Navigation";
import User from "../../items/system/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
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
