import Image from "next/image";
import React from "react";

// The LoginTemplate is used in the parts where you need:
// login, forgot password and reset password
export default function LoginTemplate({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <div className="row bg-purple min-vh-100">
        <div className="d-flex justify-content-center align-self-center">

          <Image src={"/logo.svg"} alt="Peteca" width={362} height={120} />
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  );
}
