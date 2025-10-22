import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaDownload, FaEye } from 'react-icons/fa';

// --- MOCK DATA ---
const mockReservas = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcd',
    fecha_reserva: '2025-10-20',
    estado_reserva: 'Disponible',
    codigo_reserva: 'ABC1A5D',
    vuelo_id: 'VUE-1001',
    usuario_id: 'USR-2005',
    aceptar_terminos: true,
    url_pdf: '/pdfs/reserva-ABC1A5D.pdf',
  },
  {
    id: 'b2c3d4e5-f678-9012-3456-7890abcde',
    fecha_reserva: '2025-10-18',
    estado_reserva: 'Aplazado',
    codigo_reserva: 'DEF9B2E',
    vuelo_id: 'VUE-1002',
    usuario_id: 'USR-2010',
    aceptar_terminos: true,
    url_pdf: null, // Sin PDF disponible
  },
  {
    id: 'c3d4e5f6-7890-1234-5678-90abcdef',
    fecha_reserva: '2025-10-15',
    estado_reserva: 'No Disponible',
    codigo_reserva: 'GHI7C3F',
    vuelo_id: 'VUE-1003',
    usuario_id: 'USR-2015',
    aceptar_terminos: true,
    url_pdf: '/pdfs/reserva-GHI7C3F.pdf',
  },
];

// --- FUNCIONES DE AYUDA ---

// Función para obtener el estilo del Badge (etiqueta de estado)
const getBadgeVariant = (estado) => {
  switch (estado) {
    case 'Disponible':
      return 'success';
    case 'Aplazado':
      return 'warning';
    case 'No Disponible':
      return 'danger';
    default:
      return 'secondary';
  }
};

const VerReservas = () => {
  const [reservas] = useState(mockReservas);
  // const [loading, setLoading] = useState(false); // Para mostrar estado de carga

  // --- DEFINICIÓN DE COLUMNAS ---
  const columns = [
    {
      name: 'Código Reserva',
      selector: row => row.codigo_reserva,
      sortable: true,
      grow: 1,
      center: true,
    },
    {
      name: 'Fecha Reserva',
      selector: row => row.fecha_reserva,
      sortable: true,
      center: true,
      // Formato simple de fecha, útil si usas objetos Date
      // format: row => new Date(row.fecha_reserva).toLocaleDateString(),
    },
    {
      name: 'Estado',
      selector: row => row.estado_reserva,
      sortable: true,
      center: true,
      // Renderizado personalizado para mostrar el Badge de Bootstrap
      cell: row => (
        <Badge bg={getBadgeVariant(row.estado_reserva)}>
          {row.estado_reserva}
        </Badge>
      ),
    },
    {
      name: 'Vuelo ID',
      selector: row => row.vuelo_id,
      hide: 'sm', // Oculta en pantallas pequeñas si es necesario
      center: true,
    },
    {
      name: 'Términos',
      selector: row => row.aceptar_terminos,
      sortable: true,
      center: true,
      cell: row => (row.aceptar_terminos ? 'Sí' : 'No'),
    },
    {
      name: 'Acciones',
      button: true, // Indica que esta columna contiene botones/acciones
      cell: row => (
        <>
          <Button variant="info" size="sm" className="me-2" title="Ver Detalles">
            <FaEye />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            title="Descargar Tiquete"
            // Deshabilita si no hay URL_PDF
            disabled={!row.url_pdf}
            onClick={() => row.url_pdf && window.open(row.url_pdf, '_blank')}
          >
            <FaDownload />
          </Button>
        </>
      ),
      center: true,
      minWidth: '120px',
    },
  ];

  // Configuración de paginación
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <>
      <h1 className="mb-4">Gestión de Reservas</h1>
      <p className="mb-4 text-muted">Listado completo de todas las reservas realizadas en el sistema.</p>

      <Card className="shadow-sm border-0">
        <Card.Body>
          <DataTable
            columns={columns}
            data={reservas}
            title="Reservas del Sistema"
            pagination
            paginationComponentOptions={paginationComponentOptions}
            responsive
            highlightOnHover
            pointerOnHover
            // Añade esto si quieres un buscador en la tabla
            // subHeader
            // subHeaderComponent={ <FilterComponent /> } 
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default VerReservas;