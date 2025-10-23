import React, { useState } from "react"
import { Container, Card, Form, Button, Row, Col, Badge, Spinner } from "react-bootstrap"
import toast from "react-hot-toast"
import { crearCompra } from "../services/compraService"

export default function CompraInterfaz({ reservaId }) {
  const [metodoPago, setMetodoPago] = useState("Tarjeta Credito")
  const [loading, setLoading] = useState(false)
  const [compra, setCompra] = useState(null)

  const handleCompra = async () => {
    try {
      setLoading(true)
      const nuevaCompra = await crearCompra({ reservaId, metodo_pago: metodoPago })
      setCompra(nuevaCompra)
      toast.success(`Compra registrada con código ${nuevaCompra.codigo_compra}`)
    } catch (err) {
      console.error(err)
      toast.error("Error al registrar la compra")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Procesando compra...</p>
      </div>
    )
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Confirmación de Compra</h2>
      <Card className="shadow-lg p-4 border-0">
        <Row>
          <Col md={7}>
            <h4>Detalle de la compra</h4>
            {compra ? (
              <>
                <p><strong>Código:</strong> {compra.codigo_compra}</p>
                <p><strong>Total:</strong> ${compra.total.toLocaleString("es-CO")}</p>
                <Badge bg="success">{compra.estado_pago}</Badge>
              </>
            ) : (
              <p className="text-muted">Aún no has realizado reservas</p>
            )}
          </Col>
          <Col md={5}>
            <Form>
              <Form.Group>
                <Form.Select
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option value="Tarjeta Credito">Tarjeta Crédito</option>
                  <option value="Tarjeta Debito">Tarjeta Débito</option>
                  <option value="PSE">PSE</option>
                </Form.Select>
              </Form.Group>
              <Button
                className="mt-4 w-100"
                variant="primary"
                size="lg"
                disabled={loading}
                onClick={handleCompra}
              >
                {loading ? "Procesando..." : "Confirmar Compra"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}
