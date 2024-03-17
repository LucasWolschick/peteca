"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SystemTemplate from "./";
import LoginTemplate from "./LoginTemplate";
import { config } from "@fortawesome/fontawesome-svg-core";
import React, { use, useEffect } from "react";
import { AuthProvider, useAuth } from "../AuthContext";

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
          <MainContent />
      </AuthProvider>
    </React.StrictMode>
  )
}


