/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Table, Alert } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import supabase from "../Supabase"; 
import { useAuth } from "../context/AuthContext"; 
const GestionarAviones = () => {
  const { user, isAuthenticated } = useAuth();  // Se extrae el usuario y su autenticación
  const [aviones, setAviones] = useState([]);
  const [formData, setFormData] = useState({
    id: "", 
    modelo_avion: "",
    numero_sillas: 3,
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Verificar si el usuario es administrador
  if (!isAuthenticated || user?.rol !== "administrador") {
    return <Alert variant="danger">No tienes permisos para gestionar los aviones.</Alert>;
  }

  // Obtener los aviones desde la base de datos
  useEffect(() => {
    const fetchAviones = async () => {
      const { data, error } = await supabase.from("avion").select("*");
      if (error) {
        console.error("Error al obtener aviones:", error);
      } else {
        setAviones(data);
      }
    };

    fetchAviones();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Crear o actualizar avión
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de los campos
    if (!formData.modelo_avion || formData.numero_sillas <= 0) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      // Verificar que `id` no esté vacío al actualizar
      if (isEditing && !formData.id) {
        throw new Error("El campo ID no puede estar vacío.");
      }

      if (isEditing) {
        // Actualizar avión
        const { data, error } = await supabase
          .from("avion")
          .update(formData)
          .match({ id: formData.id });
          console.log(data)

        if (error) throw error;
        toast.success("Avión actualizado exitosamente");
      } else {
        // Crear nuevo avión (UUID generado automáticamente por Supabase)
        const { data, error } = await supabase
          .from("avion")
          .insert([formData]);
          console.log(data);

        if (error) throw error;
        toast.success("Avión creado exitosamente");
      }

      // Limpiar formulario y actualizar lista de aviones
      setFormData({
        id: "", 
        modelo_avion: "",
        numero_sillas: 3,
      });
      setIsEditing(false);
      setError("");
      fetchAviones();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear/actualizar el avión");
    }
  };

  // Eliminar avión
  const handleDelete = async (id) => {
    const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este avión?");
    if (confirmation) {
      try {
        const { data, error } = await supabase.from("avion").delete().match({ id });
        console.log(data)
        if (error) throw error;
        toast.success("Avión eliminado exitosamente");
        fetchAviones();
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar el avión");
      }
    }
  };

  // Manejar la edición de un avión
  const handleEdit = (id) => {
    const avion = aviones.find((a) => a.id === id);
    setFormData({
      id: avion.id,  // Asignar el ID del avión al editar
      modelo_avion: avion.modelo_avion,
      numero_sillas: avion.numero_sillas,
    });
    setIsEditing(true);
  };

  return (
    <Card className="shadow-sm p-4 border-0">
      <Card.Body>
        {/* Mostrar error si es necesario */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Modelo del Avión</Form.Label>
              <Form.Control
                type="text"
                placeholder="Modelo del avión"
                value={formData.modelo_avion}
                onChange={handleChange}
                id="modelo_avion"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>Número de Sillas</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={formData.numero_sillas}
                onChange={handleChange}
                id="numero_sillas"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {isEditing ? "Actualizar Avión" : "Crear Avión"}
          </Button>
        </div>
      </Card.Body>

      <Card.Body>
        {/* Tabla de aviones */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Número de Sillas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aviones.map((avion) => (
              <tr key={avion.id}>
                <td>{avion.modelo_avion}</td>
                <td>{avion.numero_sillas}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(avion.id)}>
                    <FaEdit /> Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(avion.id)}>
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

export default GestionarAviones;
