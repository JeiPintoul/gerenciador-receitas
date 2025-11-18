import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NovaReceita } from "../pages";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nova" element={<NovaReceita />} />

                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}