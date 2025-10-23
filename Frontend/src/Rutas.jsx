import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ToastProvider from "./Components/ToastProvider";

import NavbarUser from "./user/NavbarUser";
import DashboardContent from "./Admin/DashboardContent";
import AdminLayout from "./Admin/AdminLayout";
import StatsCards from "./Admin/StatsCards";
import VerReservas from "./Admin/VerReservas";
import CrearVuelo from "./Admin/CrearVuelo";
import BuscarVuelos from "./user/BuscarVuelos";
import SeleccionAsientos from "./user/SeleccionAsientos";
import { Authprovider, useAuth } from "./context/AuthContext";
import GestionarVuelos from "./Admin/Gestionarvuelos";

const Rutas = () => {
  return (
    <Authprovider>
      <BrowserRouter>
        <ToastProvider />
        <RutasWeb />
      </BrowserRouter>
    </Authprovider>
  );
};

const RutasWeb = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Rutas Administrador */}
      <Route path="dash-admin" element={isAuthenticated && user.rol === "administrador" ? (<AdminLayout />) : (<Navigate to="/" />)}>

        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="cards" element={<StatsCards />} />
        <Route path="reservas" element={<VerReservas />} />
        <Route path="crear-vuelo" element={<CrearVuelo />} />
        <Route path="vuelos" element={<GestionarVuelos />} />

      </Route>

      {/* Rutas Usuario */}
      <Route path="dash-user" element={isAuthenticated && user.rol === "pasajeros" ? (<NavbarUser />) : (<Navigate to="/" />)}>

        
        <Route path="buscar-vuelos" element={<BuscarVuelos />}></Route>
        <Route path="seleccion-asientos" element={<SeleccionAsientos />}></Route>

      </Route>
    </Routes>
  );
};

export default Rutas;
