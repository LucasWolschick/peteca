import { Route, Routes } from "react-router-dom";

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