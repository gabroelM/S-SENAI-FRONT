import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardUsuario from "./pages/DashboardUsuario";
import DashboardTecnico from "./pages/DashboardTecnico";
import NovoChamado from "./pages/NovoChamado";
import VerChamado from "./pages/VerChamado";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usuario" element={<DashboardUsuario />} />
          <Route path="/tecnico" element={<DashboardTecnico />} />
          <Route path="/novo-chamado" element={<NovoChamado />} />
          <Route path="/chamado/:id" element={<VerChamado />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
