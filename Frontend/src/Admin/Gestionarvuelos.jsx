import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const GestionarVuelos = () => {
  return (
    <Card className="shadow-sm p-4 border-0">
      <Card.Body>
        <Row className="g-3">
          {/* Campo De Origen */}
          <Col md={3}>
            <Form.Group>
              <Form.Label>Desde</Form.Label>
              <Form.Control type="text" placeholder="New York" defaultValue="New York" />
            </Form.Group>
          </Col>

          {/* Campo Hasta Destino */}
          <Col md={3}>
            <Form.Group>
              <Form.Label>Hasta</Form.Label>
              <Form.Control type="text" placeholder="Chicago" defaultValue="Chicago" />
            </Form.Group>
          </Col>

          {/* Fecha de Vuelo */}
          <Col md={3}>
            <Form.Group>
              <Form.Label>Fecha Vuelo</Form.Label>
              <div className="input-group">
                <Form.Control type="date" defaultValue="2025-12-15" />
                <span className="input-group-text"><FaCalendarAlt /></span>
              </div>
            </Form.Group>
          </Col>

          {/* Cantidad de Pasajeros */}
          <Col md={3}>
            <Form.Group>
              <Form.Label>Cantidad Pasajeross</Form.Label>
              <div className="input-group">
                <Form.Control type="number" defaultValue="8" min="1" />
                <span className="input-group-text"><FaUser /></span>
              </div>
            </Form.Group>
          </Col>
        </Row>
        
        <div className="d-flex justify-content-end mt-4">
            <Button variant="primary">Buscar Vuelos</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GestionarVuelos;