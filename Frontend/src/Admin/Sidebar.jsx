import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaPlane, FaPlus, FaCalendarCheck, FaBook, FaSignOutAlt, FaHeadset } from 'react-icons/fa';


const Sidebar = () => {
  return (
    <div className="vh-100 bg-primary text-white p-3 d-flex flex-column" style={{ width: '100%' }}>
      
      {/* Logo/Título */}
      <div className="mb-4">
        {/* <img src="..." alt="Logo" style={{ height: '30px' }} /> */}
        <h4 className="mt-2 text-center">AdminLinks</h4>
      </div>

      {/* Menú Principal */}
      <Nav className="flex-column">
        {/* Dashboard */}
        <Nav.Link href="#" className="text-white active bg-dark rounded my-1">
          <FaCalendarCheck className="me-2" /> Dashboard
        </Nav.Link>
        
        {/* Crear Vuelo (Módulo para crear un nuevo vuelo, esencial para el reto) */}
        <Nav.Link href="#" className="text-white my-1">
          <FaPlus className="me-2" /> Crear Vuelo
        </Nav.Link>

        {/* Gestionar Vuelos (Visualización y edición de la lista de vuelos) */}
        <Nav.Link href="#" className="text-white my-1">
          <FaPlane className="me-2" /> Gestionar Vuelos
        </Nav.Link>

        {/* Ver Reservas (Relacionado con la sección "Módulo administrativo para ver vuelos y reservas" del reto) */}
        <Nav.Link href="#" className="text-white my-1">
          <FaBook className="me-2" /> Ver Reservas
        </Nav.Link>
      </Nav>

      {/* Secciones Inferiores */}
      <div className="mt-auto">
        <hr className="bg-white" />
        <Nav className="flex-column">
          <Nav.Link href="#" className="text-white my-1">
            <FaHeadset className="me-2" /> Apoyo
          </Nav.Link>
          <Nav.Link href="#" className="text-white my-1">
            <FaSignOutAlt className="me-2" /> Cerrar Sesión
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;