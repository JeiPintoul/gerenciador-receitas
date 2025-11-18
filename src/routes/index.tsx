import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NovaReceita } from "../pages";
import { EditarReceita } from "../pages/EditarReceita/EditarReceita";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nova" element={<NovaReceita />} />
                <Route path="/editar/:id" element={<EditarReceita />} />

                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
