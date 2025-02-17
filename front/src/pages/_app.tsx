import { AuthProvider } from "@/AuthContext";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SystemProvider } from "@/SystemContext";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Head>
        <title>Peteca</title>
        <meta name="description" content="SGI para grupos PET" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <AuthProvider>
        <SystemProvider>
          <main
            role="main"
            className={"min-vh-100 overflow-hidden " + inter.className}
          >
            <div className="min-vw-100">
              <Component {...pageProps} />
            </div>
          </main>
        </SystemProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
