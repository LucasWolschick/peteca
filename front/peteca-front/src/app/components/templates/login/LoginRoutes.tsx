import { Route, Routes } from "react-router-dom";


// All the routes that the login template has
export default function LoginRoutes()
{
    return (
        <>
            <Routes>
                <Route path="/login" element={<h1>Teste</h1>} ></Route>
                <Route path="/forgotpassword" element={<h1>Teste</h1>} ></Route>
                <Route path="/resetpassword" element={<h1>Teste</h1>} ></Route>
                <Route path="/emailsent" element={<h1>Teste</h1>} ></Route>
            </Routes>
        </>
    );
}