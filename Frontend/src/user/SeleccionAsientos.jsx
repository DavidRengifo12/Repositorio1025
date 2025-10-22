import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaChair, FaPlane } from 'react-icons/fa';
//import { useNavigate } from 'react-router-dom';

const mockLayout = {
    avionId: 'avion-a320-001',
    modelo: 'Airbus A320',
    capacidad: 180,
    filas: 30, // 30 filas de asientos
    asientosPorFila: 6, // A, B, C | D, E, F
};

// Simula el estado de las sillas basado en la tabla 'asignacion_sillas' y 'reservas'
const mockEstadoAsientos = [
    // Reservadas / Ocupadas (asignacion_sillas existe y la reserva está confirmada) - ROJO
    { codigo: '1D', estado: 'Reservada', reserva_id: 'reserva-xyz' },
    { codigo: '1E', estado: 'Reservada', reserva_id: 'reserva-abc' },
    { codigo: '2C', estado: 'Reservada', reserva_id: 'reserva-def' },
    
    // Pendientes / Bloqueadas Temporalmente (otro usuario las está seleccionando) - AMARILLO (Se marcará internamente)
    // Para simular la concurrencia, marcamos '3A' como pendiente global.
    { codigo: '3A', estado: 'Pendiente', reserva_id: 'user-temp-123' }, 
];

/** * Función para obtener el estado de una silla específica.
 * @param {string} codigo - Ejemplo: '1A'
 * @returns {object} El objeto de estado de la silla.
 */
const getEstadoSilla = (codigo) => {
    return mockEstadoAsientos.find(s => s.codigo === codigo) || { estado: 'Disponible', reserva_id: null };
};


const seatBaseStyle = {
    width: '35px',
    height: '40px',
    margin: '4px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
};

const seatStyles = {
    available: { ...seatBaseStyle, backgroundColor: '#4CAF50', color: 'white' }, // Verde
    reserved: { ...seatBaseStyle, backgroundColor: '#F44336', color: 'white', cursor: 'not-allowed', opacity: 0.6 }, // Rojo
    pending: { ...seatBaseStyle, backgroundColor: '#FFC107', color: '#333', border: '2px solid #FFA000' }, // Amarillo
    aisle: { width: '40px' }, // Pasillo
};



const SeleccionAsientos = ({ vueloId }) => {
    const [sillasSeleccionadas, setSillasSeleccionadas] = useState([]);
    //const navigate = useNavigate();
    const MAX_PASAJEROS = 5; 

    // Función para manejar el clic en una silla
    const handleSeatClick = (codigoSilla) => {
        const estadoActual = getEstadoSilla(codigoSilla).estado;

        // No permite seleccionar asientos que están siendo usados o bloqueados
        if (estadoActual === 'Reservada' || estadoActual === 'Pendiente') {
            return;
        }

        if (sillasSeleccionadas.includes(codigoSilla)) {
            // Deseleccionar
            setSillasSeleccionadas(sillasSeleccionadas.filter(s => s !== codigoSilla));
        } else if (sillasSeleccionadas.length < MAX_PASAJEROS) {
            // Seleccionar
            setSillasSeleccionadas([...sillasSeleccionadas, codigoSilla]);
        } else {
            alert(`Solo puede seleccionar un máximo de ${MAX_PASAJEROS} asientos por compra.`);
        }
    };
    
    // Genera el código de silla (e.g., '1A', '2B')
    const generateSeatCode = (rowIndex, seatIndex) => {
        const rowNum = rowIndex + 1;
        const seatLetter = String.fromCharCode(65 + seatIndex); 
        return `${rowNum}${seatLetter}`;
    };

    // Renderiza una sola silla
    const renderSeat = (codigoSilla, key) => {
        const { estado } = getEstadoSilla(codigoSilla);
        
        let style = seatStyles.available;
        let statusLabel = estado;

        // 1. Asiento seleccionado por el USUARIO (propia)
        if (sillasSeleccionadas.includes(codigoSilla)) {
            style = seatStyles.pending;
            statusLabel = 'Tu Selección';
        } 
        // 2. Asiento Reservado (Confirmado o Bloqueado por otro)
        else if (estado === 'Reservada' || estado === 'Pendiente') {
            style = seatStyles.reserved; 
            statusLabel = (estado === 'Reservada' ? 'Reservada' : 'Bloqueada');
        } 
        // 3. Asiento Disponible
        // Si no entra en los 'if', mantiene el estilo 'available' por defecto.

        return (
            <div 
                key={key} 
                style={style}
                onClick={() => handleSeatClick(codigoSilla)}
                title={`Silla: ${codigoSilla} | Estado: ${statusLabel}`}
            >
                {codigoSilla.slice(1)} {/* Muestra solo la letra (A, B, C...) */}
            </div>
        );
    };

    const handleContinue = () => {
        // Enviar las sillas seleccionadas al componente de Registro de Pasajeros (Sección 3)
        console.log('Navegando a Registro de Pasajeros con sillas:', sillasSeleccionadas);
        // navigate('/dash-user/registro-pasajeros', { state: { selectedSeats: sillasSeleccionadas } });
        alert(`Continuando con la reserva de ${sillasSeleccionadas.length} asientos.`);
    };

    return (
        <Container className="my-5">
            <h2 className="mb-4"><FaChair /> Selección de Asientos</h2>
            <Card className="shadow-lg p-4 border-0">
                
                {/* Información del Vuelo */}
                <h4 className="mb-3">
                    Vuelo: <Badge bg="primary">{mockLayout.modelo}</Badge> 
                    <small className="text-muted ms-2">/ ID: {vueloId || 'Vuelo-1001'}</small>
                </h4>
                <p className="text-muted">
                    Seleccione los asientos para sus **{sillasSeleccionadas.length}** de {MAX_PASAJEROS} pasajeros.
                </p>

                <hr/>

                {/* Leyenda de Colores */}
                <Row className="mb-4 justify-content-center text-center">
                    <Col xs={3}><Badge bg="success">Disponible</Badge></Col>
                    <Col xs={3}><Badge bg="warning">Tu Selección</Badge></Col>
                    <Col xs={4}><Badge bg="danger">Reservada/Bloqueada</Badge></Col>
                </Row>
                
                {/* Mapa de Asientos */}
                <div className="d-flex flex-column align-items-center border p-4 bg-light rounded">
                    {/* Cabecera del Avión */}
                    <div className="text-center mb-4">
                        <FaPlane className="fs-1 text-primary" />
                        <p className="mb-0 text-muted small fw-bold">CABINA DEL AVION</p>
                    </div>

                    {/* Renderizado de Filas de Asientos */}
                    {Array.from({ length: mockLayout.filas }, (_, rowIndex) => (
                        <div key={rowIndex} className="d-flex align-items-center my-1">
                            {/* Número de Fila */}
                            <span className="me-3 fw-bold text-muted" style={{ width: '20px' }}>
                                {rowIndex + 1}
                            </span>
                            
                            {/* Grupo Izquierdo (A, B, C) */}
                            {Array.from({ length: 3 }, (_, seatIndex) => {
                                const codigo = generateSeatCode(rowIndex, seatIndex);
                                return renderSeat(codigo, `l-${codigo}`);
                            })}

                            {/* Pasillo (Aisle) */}
                            <div style={seatStyles.aisle}></div>

                            {/* Grupo Derecho (D, E, F) */}
                            {Array.from({ length: 3 }, (_, seatIndex) => {
                                const codigo = generateSeatCode(rowIndex, seatIndex + 3);
                                return renderSeat(codigo, `r-${codigo}`);
                            })}
                        </div>
                    ))}
                    <p className="mt-4 text-muted small">Final de la Cabina</p>
                </div>
                
                <hr className="mt-5"/>
                
                {/* Resumen y Botón de Continuar */}
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Sillas: <Badge bg="secondary">{sillasSeleccionadas.join(', ')}</Badge></h4>
                    <Button 
                        variant="primary" 
                        size="lg" 
                        disabled={sillasSeleccionadas.length === 0}
                        onClick={handleContinue}
                    >
                        Continuar a Registro de Pasajeros
                    </Button>
                </div>

            </Card>
        </Container>
    );
};

export default SeleccionAsientos;