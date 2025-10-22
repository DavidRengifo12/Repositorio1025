import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaPlaneDeparture, FaPlus, FaBook, FaSignOutAlt, FaCalendarCheck } from 'react-icons/fa';

const AdminLayout = () => {
  const location = useLocation();

  // Define los ítems del menú con sus rutas
  const navItems = [
    { to: 'dashboard', icon: FaCalendarCheck, label: 'Dashboard' },
    { to: 'crear-vuelo', icon: FaPlus, label: 'Crear Vuelo' },
    { to: 'vuelos', icon: FaPlaneDeparture, label: 'Gestionar Vuelos' },
    { to: 'reservas', icon: FaBook, label: 'Ver Reservas' },
  ];

  return (
    <Container fluid style={{ minHeight: '100vh' }}>
      <Row>
        {/* Columna para la Sidebar (md={2}) */}
        <Col md={2} className="p-0 bg-primary text-white d-flex flex-column" style={{ position: 'fixed', height: '100vh' }}>
          
          {/* Título/Logo */}
          <div className="p-4 mb-4 border-bottom">
            <h4 className="text-center">AirLines</h4>
          </div>

          {/* Menú de Navegación */}
          <Nav className="flex-column px-3 flex-grow-1">
            {navItems.map((item) => (
              <Nav.Link
                key={item.to}
                as={Link}
                to={item.to}
                // Aplica 'active' si la ruta actual coincide
                className={`text-white my-1 ${location.pathname.endsWith(item.to) ? 'bg-dark rounded' : ''}`}
              >
                <item.icon className="me-2" /> {item.label}
              </Nav.Link>
            ))}
          </Nav>
          
          {/* Cerrar Sesión (al final) */}
          <div className="mt-auto p-3 border-top">
            <Nav.Link as={Link} to="/login" className="text-white">
              <FaSignOutAlt className="me-2" /> Cerrar Sesións
            </Nav.Link>
          </div>
        </Col>

        {/* Columna para el Contenido Principal (md={10}) */}
        {/* Agrega un offset para empujar el contenido a la derecha de la sidebar fija */}
        <Col md={{ span: 10, offset: 2 }} className="p-4">
          {/* Aquí se cargará el contenido específico de la ruta anidada */}
          <Outlet /> 
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;