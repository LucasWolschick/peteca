"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import SystemTemplate from "./components/templates/system/SystemTemplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React, { use, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import LoginTemplate from "./components/templates/login/LoginTemplate";
import { AuthProvider, useAuth } from "./components/templates/login/AuthContext";

config.autoAddCss = false;

function MainContent() {
  const { isLogged } = useAuth();

  useEffect(() => {
    console.log("isLogged mudou para", isLogged);
  
  }, [isLogged])

  return (
    <main role="main" className="min-vh-100 overflow-hidden">
      <div className="min-vw-100">
        {isLogged ? <SystemTemplate /> : <LoginTemplate />}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  )
}


