import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaArrowCircleUp } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <Container>
          <div className="navbar-brand d-flex align-items-center">
            <img
            src="/Airlines.png" 
            alt="Logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              objectFit: 'cover'
            }}
          />

            <span className="fw-bold fs-4" style={{ color: '#2E2E2E' }}>AirLines</span>
          </div>
          
          <div className="navbar-nav d-none d-lg-flex flex-row me-auto ms-5">
            <a className="nav-link px-3 fw-medium" href="#inicio" style={{ color: '#2E2E2E' }}>Inicio</a>
            <a className="nav-link px-3 fw-medium" href="#servicios" style={{ color: '#717171' }}>Servicios</a>
            <a className="nav-link px-3 fw-medium" href="#contacto" style={{ color: '#717171' }}>Contacto</a>
          </div>

          <div className="d-flex gap-2">
            <Button
              onClick={() => navigate('/login')}
              variant="link"
              className="text-decoration-none fw-medium"
              style={{ color: '#4E73DF' }}
            >
              Iniciar sesion
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="px-4 py-2 fw-medium"
              style={{
                backgroundColor: '#4E73DF',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Registrarse
            </Button>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section id="incio" className="py-5"  style={{ backgroundColor: '#F5F7FA' }}>
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="pe-lg-5">
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#2E2E2E' }}>
                Reserva los mejores <span style={{ color: '#4E73DF' }}>vuelos</span> con nosotros
              </h1>
              <p className="fs-5 text-muted mb-4">
                Has reservas de manera facil, rapida y segura.
              </p>
              <Button
                onClick={() => navigate('/register')}
                className="px-4 py-3 fw-medium"
                style={{
                  backgroundColor: '#4E73DF',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1.1rem'
                }}
              >
                Comenzar Ahora
              </Button>
            </Col>
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <img
                  src="avion2.jpg"
                  alt="Profesionales trabajando"
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: '400px',
                    objectFit: 'cover',
                    filter: 'brightness(1.1)'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ color: '#2E2E2E' }}>
              Gestiona todos tus vuelos desde una sola plataforma
            </h2>
            <p className="text-muted">Soluciones optimas para aerolineas que buscan mejorar sus procesos y servicios de viaje.</p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 text-center h-100 p-4">
                <div className="mb-3">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <i className="fas fa-users fa-2x" style={{ color: '#4E73DF' }}></i>
                  </div>
                </div>
                <Card.Body className="p-0">
                  <h5 className="fw-bold mb-3" style={{ color: '#2E2E2E' }}>Gestión de Usuarios</h5>
                  <p className="text-muted small">
                 Sistema completo de gestión de pasajeros con automatización de procesos, reservas y pagos.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="border-0 text-center h-100 p-4">
                <div className="mb-3">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <i className="fas fa-building fa-2x" style={{ color: '#4CAF50' }}></i>
                  </div>
                </div>
                <Card.Body className="p-0">
                  <h5 className="fw-bold mb-3" style={{ color: '#2E2E2E' }}>Dashboard</h5>
                  <p className="text-muted small">
                    Gestiona tu negocio con un dashboard interactivo 
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="border-0 text-center h-100 p-4">
                <div className="mb-3">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <i className="fas fa-handshake fa-2x" style={{ color: '#4CAF50' }}></i>
                  </div>
                </div>
                <Card.Body className="p-0">
                  <h5 className="fw-bold mb-3" style={{ color: '#2E2E2E' }}>Colaboración en Equipo</h5>
                  <p className="text-muted small">
                    Facilitá la comunicación y coordinación entre los equipos operativos, administrativos y de vuelo de la aerolínea.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Security Section */}
      <section className="py-5" style={{ backgroundColor: '#F5F7FA' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="text-center">
                <div 
                  className="d-inline-block p-4 rounded-3"
                  style={{ backgroundColor: '#E8F5E8' }}
                >
                  <i className="fas fa-shield-alt fa-4x" style={{ color: '#4CAF50' }}></i>
                  <div className="mt-3">
                    <i className="fas fa-user-check fa-2x" style={{ color: '#4CAF50' }}></i>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-4" style={{ color: '#2E2E2E' }}>
                Seguridad y confiabilidad garantizada
              </h2>
              <p className="text-muted mb-4">
              Protegemos la información de la aerolínea y de nuestros pasajeros con protocolos confiables que garantizan 
              el manejo seguro de los datos en todo momento.
              </p>
              <Button
                className="px-4 py-2 fw-medium"
                style={{
                  backgroundColor: '#4E73DF',
                  border: 'none',
                  borderRadius: '6px'
                }}
              >
                Aprende más
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold mb-3" style={{ color: '#2E2E2E' }}>
                Impulsando el <span style={{ color: '#4E73DF' }}>crecimiento empresarial de las aerolineas</span>
              </h2>
              <p className="text-muted mb-4">Resultados que hablan por sí solos gracias a nuestro compromiso con la excelencia</p>
            </Col>
            <Col lg={6}>
              <Row className="g-4">
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-users fa-2x me-3" style={{ color: '#4CAF50' }}></i>
                    <div>
                      <small className="text-muted"><b>Vuelos</b></small>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-hand-holding-heart fa-2x me-3" style={{ color: '#4CAF50' }}></i>
                    <div>
                      <small className="text-muted"><b>Usuarios</b></small>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-calendar-check fa-2x me-3" style={{ color: '#4CAF50' }}></i>
                    <div>
                      <small className="text-muted"><b>Reservas</b></small>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-credit-card fa-2x me-3" style={{ color: '#4CAF50' }}></i>
                    <div>
                      <small className="text-muted"><b>Seleccion de silla</b></small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Policies Section */}
      <section className="py-5" style={{ backgroundColor: '#F5F7FA' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="text-center">
                <div 
                  className="d-inline-block p-4 rounded-3"
                  style={{ backgroundColor: '#E8F5E8' }}
                >
                  <i className="fas fa-mobile-alt fa-4x" style={{ color: '#4CAF50' }}></i>
                  <div className="position-relative mt-3">
                    <i className="fas fa-lock fa-2x" style={{ color: '#4CAF50' }}></i>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-4" style={{ color: '#2E2E2E' }}>
                Transparencia y compromiso
              </h2>
              <p className="text-muted mb-4">
             Nos preocupamos por la privacidad de nuestros usuarios. Nuestras políticas
              buscan proteger tus datos y ofrecer un servicio confiable y transparente.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
     <section id="contacto" className="py-5">
  <Container>
    <div className="text-center">
      <h2 className="fw-bold mb-4" style={{ color: '#2E2E2E' }}>
        ¡Tu próxima aventura empieza aquí!
      </h2>
      <p className="text-muted mb-4">
        Descubre destinos increíbles y reservá tus vuelos con total facilidad.
      </p>
    </div>
  </Container>
</section>


      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: '#263238' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center text-white">
              <img
              src="/Airlines.png"
              alt="Logo"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                objectFit: 'cover'
              }}
            />

                <span className="fw-bold fs-5">Airlines</span>
              </div>
              <p className="text-white small mt-2 mb-0">Copyright © 2025 Airlines.</p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Back to V1 Button */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <Button
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          variant="outline-primary"
          className="rounded-circle"
          style={{ width: '50px', height: '50px' }}
        >
          <i className="fas fa-arrow-left"><FaArrowCircleUp /></i>
        </Button>
      </div>
    </div>
  )
}

export default LandingPage;
