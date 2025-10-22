import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FiMail, FiPhone, FiLock, FiCalendar, FiUser } from 'react-icons/fi'
//import { registerUser } from '../services/registerService'
import supabase from '../Supabase'

export default function Register() {
  const [primerApellido, setPrimerApellido] = useState("")
  const [segundoApellido, setSegundoApellido] = useState("")
  const [nombres, setNombres] = useState("")
  const [genero, setGenero] = useState("")
  const [fechaNacimiento, setFechaNacimiento] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState("")
  const [documento, setDocumento] = useState("") 
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol] = useState("pasajeros")

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options:{
          data: {
            primerApellido,
            segundoApellido,
            nombres,
            genero,
            fechaNacimiento,
            tipoDocumento,
            documento,
            telefono, 
            rol
          }
        }
      })
      console.log(data)
      console.error(error)
      if(error){
        toast.error('Error al registrarte, intenta de nuevo')
      }
      if(data.user){
        toast.success('registro exitoso')
        navigate('/')
      }
    }catch(error){
      console.log('error al registrarse', error)
      toast.error('Ocurrio un error al registrarte, intenta de nuevo')
    }
    
  }

  return (
    <div className='min-vh-100 d-flex align-items-center' style={{ background: '#f8f9fa' }}>
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} lg={10} xl={9}>
            <Card className='shadow border-0 rounded-4 p-4'>
              <Card.Body>
                <h2 className='text-center fw-bold mb-4'>Registro de Usuario</h2>

                <Form onSubmit={handleRegister}>
                  <Row>
                    {/* Columna Izquierda */}
                    <Col md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Ingrese su primer apellido'
                          value={primerApellido}
                          onChange={(e) => setPrimerApellido(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Ingrese sus nombres'
                          value={nombres}
                          onChange={(e) => setNombres(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Género</Form.Label>
                        <Form.Select
                          value={genero}
                          onChange={(e) => setGenero(e.target.value)}
                          required
                        >
                          <option value=''>Seleccione su género</option>
                          <option value='Masculino'>Masculino</option>
                          <option value='Femenino'>Femenino</option>              
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Teléfono</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiPhone /></InputGroup.Text>
                          <Form.Control
                            type='text'
                            placeholder='Ingrese su número de teléfono'
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiMail /></InputGroup.Text>
                          <Form.Control
                            type='email'
                            placeholder='Ingrese su correo electrónico'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    {/* Columna Derecha */}
                    <Col md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Ingrese su segundo apellido'
                          value={segundoApellido}
                          onChange={(e) => setSegundoApellido(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiCalendar /></InputGroup.Text>
                          <Form.Control
                            type='date'
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Tipo Documento</Form.Label>
                        <Form.Select
                          value={tipoDocumento}
                          onChange={(e) => setTipoDocumento(e.target.value)}
                          required
                        >
                          <option value=''>Seleccione el tipo de documento</option>
                          <option value='C.C'>Cédula de ciudadanía</option>
                          <option value='T.I'>Tarjeta de identidad</option>
                          <option value='C.E'>Cédula de extranjería</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Número de Documento</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiUser /></InputGroup.Text>
                          <Form.Control
                            type='text'
                            placeholder='Ingrese su documento'
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className='mb-4'>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiLock /></InputGroup.Text>
                          <Form.Control
                            type='password'
                            placeholder='••••••••'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </Form.Group>

                      
                    </Col>
                  </Row>

                 
                  {/* Botón */}
                  <div className='text-center'>
                    <Button
                      type='submit'
                      size='lg'
                      className='px-5 rounded-pill'
                      style={{ background: '#4E73DF', border: 'none' }}
                    >
                      Registrarme
                    </Button>
                  </div>

                  {/* Enlace */}
                  <div className='text-center mt-3'>
                    Ya tienes cuenta?{" "}
                    <Link
                      to='/login'
                      className='fw-semibold text-decoration-none'
                      style={{ color: '#4E73DF' }}
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
