import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Badge, Spinner } from "react-bootstrap";
import { FaChair, FaPlane } from "react-icons/fa";
import { getAviones } from "../services/avionService";
import { getTodasAsignaciones, asignarSillaAReserva } from "../services/asignacionSillaService";
import toast from "react-hot-toast";

const SeleccionAsientos = ({ vueloId = 1, reservaId = "temp-reserva" }) => {
  const [layout, setLayout] = useState(null);
  const [asignaciones, setAsignaciones] = useState([]);
  const [sillasSeleccionadas, setSillasSeleccionadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const MAX_PASAJEROS = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const aviones = await getAviones();

        if (!aviones || aviones.length === 0) {
          toast.error("No hay aviones registrados.");
          setLoading(false);
          return;
        }

        const avion = aviones[0];
        if (!avion?.filas || !avion?.asientos_por_fila) {
          toast.error("El avión no tiene información completa de filas o asientos.");
          setLoading(false);
          return;
        }

        setLayout({
          filas: avion.filas,
          asientosPorFila: avion.asientos_por_fila,
          modelo: avion.modelo || "Avión Genérico",
          avionId: avion.id,
        });

        const asigns = await getTodasAsignaciones();
        const asientosVuelo = asigns?.filter((a) => a.vuelo_id === vueloId) ?? [];
        setAsignaciones(asientosVuelo);
      } catch (err) {
        console.error("❌ Error cargando datos del avión:", err);
        toast.error("Error cargando asientos del vuelo");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vueloId]);

  const getEstadoSilla = (codigo) => {
    const asignacion = asignaciones.find((s) => s.codigo_silla === codigo);
    if (asignacion) return "Reservada";
    if (sillasSeleccionadas.includes(codigo)) return "Tu Selección";
    return "Disponible";
  };


  const handleSeatClick = (codigo) => {
    const estado = getEstadoSilla(codigo);
    if (estado === "Reservada") return;

    if (sillasSeleccionadas.includes(codigo)) {
      setSillasSeleccionadas(sillasSeleccionadas.filter((s) => s !== codigo));
    } else if (sillasSeleccionadas.length < MAX_PASAJEROS) {
      setSillasSeleccionadas([...sillasSeleccionadas, codigo]);
    } else {
      toast.error(`Solo puedes seleccionar hasta ${MAX_PASAJEROS} asientos.`);
    }
  };

  const handleContinue = async () => {
    try {
      for (const codigo of sillasSeleccionadas) {
        await asignarSillaAReserva({
          codigo_silla: codigo,
          vuelo_id: vueloId,
          reserva_id: reservaId,
        });
      }
      toast.success("Sillas reservadas correctamente");
      console.log("Asientos guardados:", sillasSeleccionadas);
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar las sillas");
    }
  };

  const generateSeatCode = (row, seat) => `${row + 1}${String.fromCharCode(65 + seat)}`;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Cargando asientos...</p>
      </div>
    );
  }


  if (!layout) {
    return (
      <Container className="my-5 text-center">
        <Card className="p-4 shadow-sm">
          <h5>No se encontró información del avión o no hay asientos configurados.</h5>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        <FaChair /> Selección de Asientos
      </h2>

      <Card className="shadow-lg p-4 border-0">
        <h4 className="mb-3">
          Avión: <Badge bg="primary">{layout.modelo}</Badge>{" "}
          <small className="text-muted ms-2">/ Vuelo ID: {vueloId}</small>
        </h4>

        <Row className="mb-3 text-center">
          <Col><Badge bg="success">Disponible</Badge></Col>
          <Col><Badge bg="warning" text="dark">Tu selección</Badge></Col>
          <Col><Badge bg="danger">Reservada</Badge></Col>
        </Row>

        <div className="d-flex flex-column align-items-center border p-4 bg-light rounded">
          <FaPlane className="fs-1 text-primary mb-2" />
          <p className="text-muted small fw-bold mb-4">CABINA DEL AVIÓN</p>

          {Array.from({ length: layout.filas }, (_, rowIndex) => (
            <div key={rowIndex} className="d-flex align-items-center my-1">
              <span className="me-3 fw-bold text-muted" style={{ width: "20px" }}>
                {rowIndex + 1}
              </span>

              {/* Lado izquierdo */}
              {Array.from({ length: 3 }, (_, seatIndex) => {
                const codigo = generateSeatCode(rowIndex, seatIndex);
                const estado = getEstadoSilla(codigo);
                return (
                  <div
                    key={codigo}
                    onClick={() => handleSeatClick(codigo)}
                    style={{
                      width: 35,
                      height: 40,
                      margin: 4,
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: estado === "Reservada" ? "not-allowed" : "pointer",
                      backgroundColor:
                        estado === "Reservada"
                          ? "#F44336"
                          : estado === "Tu Selección"
                          ? "#FFC107"
                          : "#4CAF50",
                      color: estado === "Tu Selección" ? "#333" : "white",
                      fontWeight: "bold",
                    }}
                    title={`Silla ${codigo} - ${estado}`}
                  >
                    {codigo.slice(1)}
                  </div>
                );
              })}

              {/* Pasillo */}
              <div style={{ width: 40 }}></div>

              {/* Lado derecho */}
              {Array.from({ length: 3 }, (_, seatIndex) => {
                const codigo = generateSeatCode(rowIndex, seatIndex + 3);
                const estado = getEstadoSilla(codigo);
                return (
                  <div
                    key={codigo}
                    onClick={() => handleSeatClick(codigo)}
                    style={{
                      width: 35,
                      height: 40,
                      margin: 4,
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: estado === "Reservada" ? "not-allowed" : "pointer",
                      backgroundColor:
                        estado === "Reservada"
                          ? "#F44336"
                          : estado === "Tu Selección"
                          ? "#FFC107"
                          : "#4CAF50",
                      color: estado === "Tu Selección" ? "#333" : "white",
                      fontWeight: "bold",
                    }}
                    title={`Silla ${codigo} - ${estado}`}
                  >
                    {codigo.slice(1)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <hr className="mt-4" />
        <div className="d-flex justify-content-between align-items-center">
          <h5>
            Sillas seleccionadas:{" "}
            <Badge bg="secondary">{sillasSeleccionadas.join(", ") || "Ninguna"}</Badge>
          </h5>
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
