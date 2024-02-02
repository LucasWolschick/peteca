import Image from "next/image";
import LoginRoutes from "./LoginRoutes";
import LoginAndPassword from "./LoginAndPassword";
import PasswordRecovery from "./PasswordRecovery";
import RedefinePassword from "./RedefinePassword";
import RedefinitionConfirmation from "./RedefinitionConfirmation";

// The LoginTemplate is used in the parts where you need:
// login, forgot password and reset password
export default function LoginTemplate() {
  return (
    <>
      <div className="row bg-purple min-vh-100">
        <div className="d-flex justify-content-center align-self-center">
          <Image src={"/logo.svg"} alt="Peteca" width={362} height={120} />
        </div>
        <div>
          {/* {<LoginRoutes />} */}
          <LoginAndPassword />
            {/* <PasswordRecovery /> */}
          {/* <RedefinePassword />  */}
        </div>
      </div>
    </>
  );
}
