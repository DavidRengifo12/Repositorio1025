import React, { useEffect, useState } from "react"
import { Button, Card, Container, Row, Col, Spinner } from "react-bootstrap"
import supabase from "../Supabase"
import { postNewReservation } from "../services/reservaService.js"
import toast from "react-hot-toast"

export default function ReservasUser() {
  const [vuelos, setVuelos] = useState([])
  const [sillas, setSillas] = useState([])
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null)
  const [sillaSeleccionada, setSillaSeleccionada] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario y vuelos
  useEffect(() => {
    const fetchData = async () => {
      const { data: authData } = await supabase.auth.getUser()
      setUser(authData.user)

      const { data: vuelosData, error } = await supabase.from("vuelos").select("*")
      if (error) throw error
      setVuelos(vuelosData)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Cargar sillas del avión seleccionado
  const handleVueloSelect = async (vuelo) => {
    setVueloSeleccionado(vuelo)
    setSillas([])
    const { data, error } = await supabase
      .from("sillas")
      .select("*")
      .eq("avion_id", vuelo.avion_id)

    if (error) toast.error("Error al cargar sillas")
    else setSillas(data)
  }

  const generarCodigoReserva = () => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numeros = Math.floor(1000 + Math.random() * 9000)
    const letra = letras[Math.floor(Math.random() * letras.length)]
    return `${letra}${numeros}`
  }

  const handleReservar = async () => {
    if (!user || !vueloSeleccionado || !sillaSeleccionada) {
      toast.error("Selecciona vuelo y silla antes de continuar")
      return
    }

    try {
      const nuevaReserva = {
        codigo_reserva: generarCodigoReserva(),
        vuelo_id: vueloSeleccionado.id,
        usuario_id: user.id,
        aceptar_terminos: true,
      }

      await postNewReservation(nuevaReserva)
      toast.success("Reserva creada correctamente ")
    } catch (err) {
      console.error(err)
      toast.error("No se pudo crear la reserva")
    }
  }

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Cargando vuelos...</p>
      </div>
    )

  return (
    <Container className="my-5">
      <h2 className="mb-4">Reservar Vuelo ✈️</h2>
      <Row>
        <Col md={6}>
          <h4>Vuelos disponibles</h4>
          {vuelos.map((vuelo) => (
            <Card
              key={vuelo.id}
              className={`mb-3 p-3 ${vueloSeleccionado?.id === vuelo.id ? "border-primary" : ""}`}
              onClick={() => handleVueloSelect(vuelo)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{vuelo.numero_vuelo}</Card.Title>
                <Card.Text>
                  <strong>Fecha salida:</strong> {vuelo.fecha_salida} <br />
                  <strong>Precio:</strong> ${vuelo.precio_vuelo.toLocaleString("es-CO")}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={6}>
          <h4>Sillas del avión</h4>
          {sillas.length === 0 ? (
            <p className="text-muted">Selecciona un vuelo para ver las sillas</p>
          ) : (
            <div className="d-flex flex-wrap">
              {sillas.map((silla) => (
                <Button
                  key={silla.id}
                  variant={sillaSeleccionada?.id === silla.id ? "success" : "outline-secondary"}
                  className="m-1"
                  onClick={() => setSillaSeleccionada(silla)}
                >
                  {silla.codigo_silla}
                </Button>
              ))}
            </div>
          )}
          <Button className="mt-4 w-100" onClick={handleReservar}>
            Confirmar Reserva
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
