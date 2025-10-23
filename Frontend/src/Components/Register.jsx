import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, Col, Container, Form, Row, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import supabase from '../Supabase'
import { FiMail, FiPhone, FiLock, FiCalendar, FiUser } from 'react-icons/fi'

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {

      const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (authError) {
      toast.error('Error al registrarte: ' + authError.message)
      return
    }

    const user = authData?.user || authData?.session?.user
    console.log('Usuario obtenido:', user)

    if (!user) {
      toast.error('No se pudo obtener el usuario')
      return
    }


      // 2️⃣ Insertar datos en tabla usuarios
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([
          {
            id: user.id,
            primer_apellido: data.primerApellido,
            segundo_apellido: data.segundoApellido,
            nombres: data.nombres,
            fecha_nacimiento: data.fechaNacimiento,
            genero: data.genero,
            tipo_documento: data.tipoDocumento,
            documento: data.documento,
            telefono: data.telefono,
            rol: 'pasajeros'
          }
        ])

      if (insertError) {
        toast.error('Error guardando datos adicionales')
        console.error(insertError)
        return
      }

      toast.success('Registro exitoso')
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al registrarte')
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Primer Apellido</Form.Label>
                        <Form.Control
                          {...register('primerApellido', { required: true })}
                          type='text'
                          placeholder='Ingrese su primer apellido'
                        />
                        {errors.primerApellido && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                          {...register('nombres', { required: true })}
                          type='text'
                          placeholder='Ingrese sus nombres'
                        />
                        {errors.nombres && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Género</Form.Label>
                        <Form.Select {...register('genero', { required: true })}>
                          <option value=''>Seleccione su género</option>
                          <option value='Masculino'>Masculino</option>
                          <option value='Femenino'>Femenino</option>
                        </Form.Select>
                        {errors.genero && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Teléfono</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiPhone /></InputGroup.Text>
                          <Form.Control
                            {...register('telefono', { required: true })}
                            type='text'
                            placeholder='Ingrese su teléfono'
                          />
                        </InputGroup>
                        {errors.telefono && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiMail /></InputGroup.Text>
                          <Form.Control
                            {...register('email', { required: true })}
                            type='email'
                            placeholder='Ingrese su correo'
                          />
                        </InputGroup>
                        {errors.email && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className='mb-3'>
                        <Form.Label>Segundo Apellido</Form.Label>
                        <Form.Control
                          {...register('segundoApellido', { required: true })}
                          type='text'
                          placeholder='Ingrese su segundo apellido'
                        />
                        {errors.segundoApellido && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiCalendar /></InputGroup.Text>
                          <Form.Control
                            {...register('fechaNacimiento', { required: true })}
                            type='date'
                          />
                        </InputGroup>
                        {errors.fechaNacimiento && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Tipo Documento</Form.Label>
                        <Form.Select {...register('tipoDocumento', { required: true })}>
                          <option value=''>Seleccione el tipo de documento</option>
                          <option value='Cedula ciudadania'>Cédula de ciudadanía</option>
                          <option value='Tarjeta Identidad'>Tarjeta de identidad</option>
                          <option value='Cedula extranjera'>Cédula de extranjería</option>
                        </Form.Select>
                        {errors.tipoDocumento && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-3'>
                        <Form.Label>Número de Documento</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiUser /></InputGroup.Text>
                          <Form.Control
                            {...register('documento', { required: true })}
                            type='text'
                            placeholder='Ingrese su documento'
                          />
                        </InputGroup>
                        {errors.documento && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>

                      <Form.Group className='mb-4'>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text><FiLock /></InputGroup.Text>
                          <Form.Control
                            {...register('password', { required: true })}
                            type='password'
                            placeholder='••••••••'
                          />
                        </InputGroup>
                        {errors.password && <small className='text-danger'>Campo obligatorio</small>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className='text-center'>
                    <Button type='submit' size='lg' className='px-5 rounded-pill' style={{ background: '#4E73DF', border: 'none' }}>
                      Registrarme
                    </Button>
                  </div>

                  <div className='text-center mt-3'>
                    Ya tienes cuenta?{" "}
                    <Link to='/login' className='fw-semibold text-decoration-none' style={{ color: '#4E73DF' }}>
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
