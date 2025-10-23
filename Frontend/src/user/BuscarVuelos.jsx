import React, { useEffect, useState } from "react";
import { getCiudades } from "../services/ciudadService";
import { getFlightsFilter } from "../services/vueloService";
import { Button, Form, Table } from "react-bootstrap";
import toast from "react-hot-toast";

export default function BuscarVuelos({ onSelectFlight }) {
  const [ciudades, setCiudades] = useState([]);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [vuelos, setVuelos] = useState([]);

  useEffect(() => {
    getCiudades().then(setCiudades).catch(() => toast.error("Error cargando ciudades"));
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!origen || !destino || !fecha) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      const data = await getFlightsFilter(origen, destino);
      if (data.length === 0) toast("No hay vuelos disponibles");
      setVuelos(data);
    } catch (error) {
      toast.error("Error al buscar vuelos", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Buscar vuelos ✈️</h3>

      <Form onSubmit={handleBuscar} className="row g-3">
        <Form.Group className="col-md-4">
          <Form.Label>Origen</Form.Label>
          <Form.Select value={origen} onChange={(e) => setOrigen(e.target.value)}>
            <option value="">Seleccionar...</option>
            {ciudades.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-md-4">
          <Form.Label>Destino</Form.Label>
          <Form.Select value={destino} onChange={(e) => setDestino(e.target.value)}>
            <option value="">Seleccionar...</option>
            {ciudades.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-md-3">
          <Form.Label>Fecha salida</Form.Label>
          <Form.Control
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </Form.Group>

        <div className="col-md-1 d-flex align-items-end">
          <Button type="submit" className="w-100">Buscar</Button>
        </div>
      </Form>

      {vuelos.length > 0 && (
        <Table striped bordered hover className="mt-4 text-center">
          <thead>
            <tr>
              <th>Número vuelo</th>
              <th>Precio</th>
              <th>Fecha salida</th>
              <th>Hora salida</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {vuelos.map((v) => (
              <tr key={v.id}>
                <td>{v.numero_vuelo}</td>
                <td>${Number(v.precio_vuelo).toLocaleString("es-CO")}</td>
                <td>{v.fecha_salida}</td>
                <td>{new Date(v.hora_salida).toLocaleTimeString()}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => onSelectFlight(v)}
                  >
                    Seleccionar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
