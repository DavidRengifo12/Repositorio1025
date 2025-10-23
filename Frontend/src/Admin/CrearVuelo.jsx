import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { FaPlaneDeparture, FaClock, FaCalendarAlt, FaEuroSign, FaChair } from "react-icons/fa";
import toast from "react-hot-toast";
import { postNewFlight } from "../services/vueloService";

const CrearVuelo = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    codigo_vuelo: "",
    origen_id: "",
    destino_id: "",
    fecha_vuelo: "",
    hora_salida: "",
    duracion: "",
    avion_id: "",
    capacidad_asientos: "",
    precio_base: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postNewFlight(formData);
      toast.success("Vuelo creado exitosamente 🎉");
      setFormData({
        codigo_vuelo: "",
        origen_id: "",
        destino_id: "",
        fecha_vuelo: "",
        hora_salida: "",
        duracion: "",
        avion_id: "",
        capacidad_asientos: "",
        precio_base: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el vuelo ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-4">Crear Nuevo Vuelo</h1>
      <Card className="shadow-sm p-4 border-0">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="codigo_vuelo" className="mb-3">
                <Form.Label>Código de Vuelo</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.codigo_vuelo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="origen_id" className="mb-3">
                <Form.Label><FaPlaneDeparture /> Origen</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.origen_id}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="destino_id" className="mb-3">
                <Form.Label>Destino</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.destino_id}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="fecha_vuelo" className="mb-3">
                <Form.Label><FaCalendarAlt /> Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.fecha_vuelo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="hora_salida" className="mb-3">
                <Form.Label><FaClock /> Hora</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.hora_salida}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="duracion" className="mb-3">
                <Form.Label>Duración (Horas)</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.duracion}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="precio_base" className="mb-3">
                <Form.Label><FaEuroSign /> Precio Base</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={formData.precio_base}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Programar Vuelo"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default CrearVuelo;
