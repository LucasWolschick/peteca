"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import SystemTemplate from "./components/templates/system/SystemTemplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginTemplate from "./components/templates/login/LoginTemplate";

config.autoAddCss = false;

export default function Home() {
  const isLogged = false;

  return (
    <React.StrictMode>
      <BrowserRouter>
        <main role="main" className="min-vh-100 overflow-hidden">
          <div className="min-vw-100">
            {!isLogged ? <SystemTemplate /> : <LoginTemplate />}
          </div>
        </main>
      </BrowserRouter>
    </React.StrictMode>
  );
}
