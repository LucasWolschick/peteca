import { Routes, Route } from "react-router-dom";
import LoginAndPassword from "./LoginAndPassword";
import PasswordRecovery from "./PasswordRecovery";
import RedefinePassword from "./RedefinePassword";
import RedefinitionConfirmation from "./RedefinitionConfirmation";

// All the routes that the login template has
export default function LoginRoutes()
{
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginAndPassword/>} ></Route>
                <Route path="/forgotpassword" element={<PasswordRecovery/>} ></Route>
                <Route path="/resetpassword" element={<RedefinePassword/>} ></Route>
                <Route path="/emailsent" element={<RedefinitionConfirmation/>} ></Route>
            </Routes>
        </>
    );
}