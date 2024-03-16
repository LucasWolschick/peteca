import { Route, Routes } from "react-router-dom";
import List from "./usuarios/List";
import Index from "./admin/Index";

// All the routes the system has 
export default function SystemRoutes() {
  return (
    <>
      <Routes>
        <Route path="/inicio" element={<h1>Teste 1</h1>} />
        <Route path="/caixinha" element={<h1>Teste 2</h1>} />
        <Route path="/estoque" element={<h1>Teste 3</h1>} />
        <Route path="/documentos" element={<h1>Teste 4</h1>} />
        <Route path="/calendario" element={<h1>Teste 5</h1>} />
        <Route path="/usuarios" element={<List />} />
        <Route path="/administracao" element={<Index />} />
      </Routes>
    </>
  );
}
