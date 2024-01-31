import { Route, Routes } from "react-router-dom";


// All the routes that the login template has
export default function LoginRoutes()
{
    return (
        <>
            <Routes>
                <Route path="/login"></Route>
                <Route path="/forgotpassword"></Route>
                <Route path="/resetpassword"></Route>
                <Route path="/emailsent"></Route>
            </Routes>
        </>
    );
}