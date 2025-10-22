import React from 'react';
import { Card, Form, Row, Col, Button, Container } from 'react-bootstrap';
import { FaPlaneDeparture, FaCalendarAlt, FaExchangeAlt, FaUsers } from 'react-icons/fa';

const BuscarVuelos = () => {
    // La lógica de estado para el formulario de búsqueda iría aquí.

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Lógica para realizar la consulta de vuelos a la API
        console.log("Realizando búsqueda de vuelos...");
        // Tras buscar, se debería renderizar una tabla de resultados (ListaVuelos.jsx)
    };

    // Define la fecha mínima (hoy) y máxima (dos meses adelante) según el reto
    const today = new Date().toISOString().split('T')[0];
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    const maxDate = twoMonthsLater.toISOString().split('T')[0];

    return (
        <Container className="my-5">
            <h2 className="mb-4">✈️ Busca tu próximo vuelo</h2>
            <Card className="shadow-lg p-4 border-0">
                <Form onSubmit={handleFormSubmit}>
                    <Row className="mb-4">
                        {/* Tipo de Viaje */}
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label className='fw-bold'>Tipo de Viaje</Form.Label>
                                <div className="d-flex gap-4">
                                    <Form.Check
                                        type="radio"
                                        id="idaYVuelta"
                                        label="Ida y Regreso"
                                        name="tipoViaje"
                                        defaultChecked
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="soloIda"
                                        label="Solo Ida"
                                        name="tipoViaje"
                                    />
                                </div>
                            </Form.Group>
                        </Col>

                        {/* Origen y Destino con Autocompletado */}
                        <Col md={6}>
                            <Form.Group controlId="origen" className="mb-3">
                                <Form.Label><FaPlaneDeparture /> Origen</Form.Label>
                                {/* Nota: Para el autocompletado, usarías un componente externo como react-select */}
                                <Form.Control type="text" placeholder="Ciudad de Origen" required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="destino" className="mb-3">
                                <Form.Label><FaExchangeAlt /> Destino</Form.Label>
                                <Form.Control type="text" placeholder="Ciudad de Destino" required />
                            </Form.Group>
                        </Col>

                        {/* Fechas */}
                        <Col md={4}>
                            <Form.Group controlId="fechaSalida" className="mb-3">
                                <Form.Label><FaCalendarAlt /> Fecha de Salida</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    required 
                                    min={today}
                                    max={maxDate}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="fechaRegreso" className="mb-3">
                                <Form.Label><FaCalendarAlt /> Fecha de Regreso (Opcional)</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    min={today}
                                    max={maxDate}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Pasajeros */}
                        <Col md={4}>
                            <Form.Group controlId="pasajeros" className="mb-3">
                                <Form.Label><FaUsers /> Pasajeros</Form.Label>
                                <Form.Control type="number" min="1" max="5" defaultValue="1" required />
                                <Form.Text className="text-muted">Máximo 5 pasajeros por compra.</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" size="lg">
                            Buscar Vuelos Disponibles
                        </Button>
                    </div>
                </Form>
            </Card>

            {/* Aquí iría el componente de resultados (ListaVuelos.jsx) */}
            {/* <ListaVuelos /> */}

        </Container>
    );
};

export default BuscarVuelos;