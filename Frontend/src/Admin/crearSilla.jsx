/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Table, Alert } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import supabase from "../Supabase"; // Asegúrate de que la ruta sea correcta
import { useAuth } from "../context/AuthContext"; // Asegúrate de que el contexto de autenticación esté correcto

const GestionarSillas = ({ avionId, modeloAvion }) => {
  const { user, isAuthenticated } = useAuth(); // Se extrae el usuario y su autenticación
  const [sillas, setSillas] = useState([]);
  const [formData, setFormData] = useState({
    codigo_silla: "",
    letra_silla: "",
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Verificar si el usuario es administrador
  if (!isAuthenticated || user?.rol !== "administrador") {
    return <Alert variant="danger">No tienes permisos para gestionar las sillas.</Alert>;
  }

  // Obtener las sillas del avión desde la base de datos
  const fetchSillas = async () => {
    const { data, error } = await supabase
      .from("sillas")
      .select("*")
      .eq("avion_id", avionId); // Verifica que avionId esté correctamente pasado

    if (error) {
      console.error("Error al obtener las sillas:", error);
    } else {
      setSillas(data);
    }
  };

  useEffect(() => {
    fetchSillas();
  }, [avionId]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Crear o actualizar silla
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de los campos
    if (!formData.codigo_silla || !formData.letra_silla) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }
    setError("");

    try {
      if (isEditing) {
        // Actualizar silla
        const { data, error } = await supabase
          .from("sillas")
          .update(formData)
          .match({ id: formData.id });
          console.log(data);

        if (error) throw error;
        toast.success("Silla actualizada exitosamente");
      } else {
        // Crear nueva silla, solo si el usuario es admin
        if (user?.rol !== "administrador") {
          setError("No tienes permisos para crear una silla.");
          return;
        }

        const { data, error } = await supabase
          .from("sillas")
          .insert([{ ...formData, avion_id: avionId }]);
          console.log(data);

        if (error) throw error;
        toast.success("Silla creada exitosamente");
      }

      // Limpiar formulario y actualizar lista de sillas
      setFormData({
        codigo_silla: "",
        letra_silla: "",
      });
      setIsEditing(false);
      setError("");
      fetchSillas();
    } catch (err) {
      console.error(err);
      toast.error("Error al crear/actualizar la silla");
    }
  };

  // Eliminar silla
  const handleDelete = async (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar esta silla?");
    if (confirmation) {
      try {
        const { data, error } = await supabase
          .from("sillas")
          .delete()
          .match({ id });
          console.log(data);

        if (error) throw error;
        toast.success("Silla eliminada exitosamente");
        fetchSillas();
      } catch (err) {
        console.error(err);
        toast.error("Error al eliminar la silla");
      }
    }
  };

  // Manejar la edición de una silla
  const handleEdit = (id) => {
    const silla = sillas.find((s) => s.id === id);
    setFormData({
      id: silla.id,
      codigo_silla: silla.codigo_silla,
      letra_silla: silla.letra_silla,
    });
    setIsEditing(true);
  };

  return (
    <Card className="shadow-sm p-4 border-0">
      <Card.Body>
        {/* Mostrar error si es necesario */}
        {error && <Alert variant="danger">{error}</Alert>}

        <h4>Gestionar Sillas para el Avión: {modeloAvion}</h4>

        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Código de Silla</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código de silla (Ej: A1)"
                value={formData.codigo_silla}
                onChange={handleChange}
                id="codigo_silla"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Letra de Silla</Form.Label>
              <Form.Control
                type="text"
                placeholder="Letra de la silla (Ej: A, B, C)"
                value={formData.letra_silla}
                onChange={handleChange}
                id="letra_silla"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {isEditing ? "Actualizar Silla" : "Crear Silla"}
          </Button>
        </div>
      </Card.Body>

      <Card.Body>
        {/* Tabla de sillas */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Código de Silla</th>
              <th>Letra de Silla</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sillas.map((silla) => (
              <tr key={silla.id || silla.codigo_silla}>
                <td>{silla.codigo_silla}</td>
                <td>{silla.letra_silla}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(silla.id)}
                    className="me-2"
                  >
                    <FaEdit /> Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(silla.id)}
                  >
                    <FaTrashAlt /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default GestionarSillas;
