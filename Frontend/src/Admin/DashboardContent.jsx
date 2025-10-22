import React from 'react';
import { Container } from 'react-bootstrap'; 
// Importamos los componentes de contenido (StatsCards y GestionarVuelos)
import StatsCards from '../Admin/StatsCards'; 
import GestionarVuelos from '../Admin/Gestionarvuelos'; 

const DashboardContent = () => {
  return (
    // ¡OJO! No usamos Container/Row/Col para el layout principal, solo para el contenido.
    // AdminLayout ya maneja el <Col md={10}> que lo envuelve.
    <Container fluid className="p-0"> {/* Usamos Container fluid solo para agrupar el contenido sin padding externo */}
      <h1 className="mb-4 text-muted">Dashboard</h1>
      <h2 className="mb-3">Bienvenido Administrador</h2>
      <p className="mb-4">Aquí podrá gestionar y ver la realización de los vuelos de su aerolínea.</p>

      {/* Tarjetas de Estadísticas */}
      <StatsCards />

      {/* Sección de Gestión de Vuelos (Usado como filtro/vista rápida) */}
      <h3 className="mt-5 mb-3">Gestionar Vuelos (Filtro Rápido)</h3>
      <GestionarVuelos />
      
      {/* Si GestionarVuelos tiene botones de acción, podrían ir aquí también */}
    </Container>
  );
};

export default DashboardContent;