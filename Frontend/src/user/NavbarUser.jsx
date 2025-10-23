import React from 'react'
import { Button, Nav, Navbar,  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, Outlet, useNavigate} from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

export default function NavbarUser() {// REAJUSTAR ESTILOS

    
    const {user, logout} = useAuth()

    const navigar = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
        navigar('/') 
    }
 
  return (
    <>
      <div>
        <header className='bg-transparent'>
            <Navbar expand="lg" fixed= "top" className="py-3 shadow-sm" style={{ background: '#4E73DF' }}>
              <div className="container">
                <Navbar.Brand className='text-white'><h4 className='m-0'>AeroLinies</h4></Navbar.Brand>
                <Navbar.Toggle arial-controls="basic-navbar-nav"></Navbar.Toggle>

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mx-auto gap-3 align-items-center'>
                        {
                            user?.rol === 'pasajeros' && (
                                <>
                                    <Nav.Link as={Link} to='/dash-user/buscar-vuelos' className="text-white fw-bold">Vuelos</Nav.Link>
                                    <Nav.Link as={Link} to='/dash-user/reservar-silla' className="text-white fw-bold">Reservar</Nav.Link>
                                    <Nav.Link as={Link} to='/dash-user/compras-tickets' className="text-white fw-bold">Realizar Pago Compra</Nav.Link>
                                    <Nav.Link as={Link} to='/dash-user/seleccion-asientos' className="text-white fw-bold">Seleccionar Asientos</Nav.Link>
                                </>
                            )
                        }    
                    </Nav>
                </Navbar.Collapse>
                <Button onClick={handleLogout}><IoIosLogOut /></Button>
              </div>
            </Navbar>
        </header>
        <div style={{paddingTop: '100px'}}>
            <Outlet></Outlet>
        </div>  
      </div>
    </>
  )
}
