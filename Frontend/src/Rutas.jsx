import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";




import LandingPage from "./LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ToastProvider from "./Components/ToastProvider";
import { useAuth } from "./context/AuthContext";
import NavbarUser from "./user/NavbarUser";
import DashboardContent from "./Admin/DashboardContent";
import AdminLayout from "./Admin/AdminLayout";
import StatsCards from "./Admin/StatsCards";
import VerReservas from "./Admin/VerReservas";
import CrearVuelo from "./Admin/CrearVuelo";
import BuscarVuelos from "./user/BuscarVuelos";
import SeleccionAsientos from "./user/SeleccionAsientos";





const Rutas =() => {
  return (
    <>
    
     <BrowserRouter>
        <ToastProvider />
        <RutasWeb /> 
     </BrowserRouter> 
     
    </>
  )
}

const RutasWeb = () => {

  const {isAuthenticated, user} = useAuth()
  
  return(
    <Routes>
      {/* Rutas no proteger no son necesarias */}
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />


      {/*User Rutas Usuario */}
      <Route path="/buscar-vuelos" element={<BuscarVuelos />}/>
      <Route path="/seleccion-asientos" element={<SeleccionAsientos />} />
      <Route path="/navbar-user" element={<NavbarUser />} ></Route> {/*PROTEGER LAS RUTAS DEssL DAHS */}

      {/*Admin Rutas */}
      <Route path="/dash-admin" element={<DashboardContent />} />
      <Route path="/admin-sidebar" element={<AdminLayout />} />
      <Route path="/cards" element={<StatsCards />} />
      <Route path="/reservas" element={<VerReservas />} />
      <Route path="/crear-vuelo" element={<CrearVuelo />} />


     
      {/*Rutas Administrador */}
      <Route path="/dash-admin" element={isAuthenticated && user.rol === "administrador" ? <AdminLayout />: <Navigate to= '/' />}>
         {/* <Route index element={<Navigate to="equipo-computo" replace />} />
         <Route path="equipo-computo" element={<GestionEquipos />} />
         <Route path="chat" element={<ChatAdmin />} />
        <Route path="equipos-reservados" element={} /> */}
      </Route>

      {/*Rutas Usuario */}
      <Route path="/dash-user" element={isAuthenticated && user.rol === 'usuario' ? <NavbarUser /> : <Navigate to='/' />}>
        {/* <Route index element={<Navigate to="reserva-equipo" replace />} />
        <Route path="reserva-equipo" element={<ReservaEquipo />} />
        <Route path="mis-reservas" element={<MisReservas />} />
        <Route path="chat" element={<ChatUsuario />} /> */}
      </Route>


    </Routes>
  )
}

export default Rutas
