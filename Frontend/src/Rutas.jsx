import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";




import LandingPage from "./LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ToastProvider from "./Components/ToastProvider";
import { useAuth } from "./context/AuthContext";





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
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/*Rutas Administrador */}
      <Route path="/dash-admin" element={isAuthenticated && user.rol === "administrador" ? <AdminLayout />: <Navigate to= '/' />}>
         {/* <Route index element={<Navigate to="equipo-computo" replace />} />
         <Route path="equipo-computo" element={<GestionEquipos />} />
         <Route path="chat" element={<ChatAdmin />} />
        <Route path="equipos-reservados" element={} /> */}
      </Route>

      {/*Rutas Usuario */}
      <Route path="/dash-user" element={isAuthenticated && user.rol === 'usuario' ? <NavbarR /> : <Navigate to='/' />}>
        {/* <Route index element={<Navigate to="reserva-equipo" replace />} />
        <Route path="reserva-equipo" element={<ReservaEquipo />} />
        <Route path="mis-reservas" element={<MisReservas />} />
        <Route path="chat" element={<ChatUsuario />} /> */}
      </Route>


    </Routes>
  )
}

export default Rutas
