// CrearVuelo.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaPlaneDeparture, FaClock, FaCalendarAlt, FaEuroSign, FaChair } from 'react-icons/fa';

const CrearVuelo = () => {
    // Usamos useState para manejar el estado inicial del formulario
    const [formData, setFormData] = useState({
        codigoVuelo: '',
        origen: '',
        destino: '',
        fechaVuelo: '',
        horaSalida: '',
        duracion: '',
        modeloAvion: '',
        capacidadAsientos: '',
        precioBase: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para validar y enviar los datos del nuevo vuelo a la API/Backend
        console.log("Datos del nuevo vuelo a enviar:", formData);
        alert('Vuelo Programado (Simulado): ' + formData.codigoVuelo);
        // Aquí iría la llamada a la API
    };

    return (
        <>
            <h1 className="mb-4">Crear Nuevo Vuelo</h1>
            <p className="mb-4 text-muted">Ingrese la información detallada para programar un nuevo vuelo en el sistema.</p>

            <Card className="shadow-sm p-4 border-0">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        {/* Código de Vuelo */}
                         <Col md={4}>
                            <Form.Group controlId="codigoVuelo" className="mb-3">
                                <Form.Label>Código de Vuelo</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: AV1234" 
                                    value={formData.codigoVuelo}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        {/* 1. Origen y Destino */}
                        <Col md={4}>
                            <Form.Group controlId="origen" className="mb-3">
                                <Form.Label><FaPlaneDeparture /> Ciudad de Origen</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: Bogotá" 
                                    value={formData.origen}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="destino" className="mb-3">
                                <Form.Label><FaPlaneDeparture className="fa-flip-horizontal" /> Ciudad de Destino</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: Madrid" 
                                    value={formData.destino}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>

                        {/* 2. Fechas y Horas */}
                        <Col md={4}>
                            <Form.Group controlId="fechaVuelo" className="mb-3">
                                <Form.Label><FaCalendarAlt /> Fecha de Salida</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={formData.fechaVuelo}
                                    onChange={handleChange}
                                    required 
                                    min={new Date().toISOString().split('T')[0]} // Restricción del reto: desde el día actual
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="horaSalida" className="mb-3">
                                <Form.Label><FaClock /> Hora de Salida</Form.Label>
                                <Form.Control 
                                    type="time" 
                                    value={formData.horaSalida}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="duracion" className="mb-3">
                                <Form.Label>Duración Estimada (Horas)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    min="1" 
                                    placeholder="Ej: 8" 
                                    value={formData.duracion}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* 3. Modelo de Avión y Capacidad (Clave para el reto) */}
                        <Col md={4}>
                            <Form.Group controlId="modeloAvion" className="mb-3">
                                <Form.Label>Modelo de Avión Asignado</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: Boeing 737 MAX" 
                                    value={formData.modeloAvion}
                                    onChange={handleChange}
                                    required 
                                />
                                <Form.Text className="text-muted">
                                    Determina la capacidad real del vuelo.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="capacidadAsientos" className="mb-3">
                                <Form.Label><FaChair /> Capacidad Total de Asientos</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    min="1" 
                                    placeholder="Ej: 150" 
                                    value={formData.capacidadAsientos}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>

                        {/* 4. Precio Base */}
                        <Col md={4}>
                            <Form.Group controlId="precioBase" className="mb-3">
                                <Form.Label><FaEuroSign /> Precio Base del Tiquete</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.01" 
                                    min="0" 
                                    placeholder="Ej: 350.00" 
                                    value={formData.precioBase}
                                    onChange={handleChange}
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end pt-3 border-top">
                        <Button variant="primary" type="submit">
                            Programar Vuelo
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
};

export default CrearVuelo;