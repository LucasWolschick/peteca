import { AuthContext } from "@/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import LoadingTemplate from "../_loadingTemplate";

// The LoginTemplate is used in the parts where you need:
// login, forgot password and reset password
export default function LoginTemplate({
  children,
}: React.PropsWithChildren<{}>) {
  const auth = useContext(AuthContext).loggedUser;
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      router.push("/system");
    }
  }, [auth]);

  if (auth || auth === undefined) {
    return <LoadingTemplate/>;;
  } else {
    return (
      <>
        <div className="row bg-purple min-vh-100">
          <div className="d-flex justify-content-center align-self-center">
            <Image src={"/logo.svg"} alt="Peteca" width={362} height={120} />
          </div>
          <div>{children}</div>
        </div>
      </>
    );
  }
}
