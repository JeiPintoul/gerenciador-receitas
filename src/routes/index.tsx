import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NovaReceita, Carrinho } from "../pages";
import { EditarReceita } from "../pages/EditarReceita/EditarReceita";
import Sidebar from "../components/Sidebar/Sidebar";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flex: 1, marginLeft: 200 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/nova" element={<NovaReceita />} />
                        <Route path="/editar/:id" element={<EditarReceita />} />
                        <Route path="/carrinho" element={<Carrinho />} />

                        <Route path="*" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
