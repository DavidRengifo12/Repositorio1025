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
            <Navbar expand="lg" fixed= "top" className="py-3 bg-success shadow-sm">
              <div className="container">
                <Navbar.Brand className='text-white'><h4 className='m-0'>Equipos Cómputo</h4></Navbar.Brand>
                <Navbar.Toggle arial-controls="basic-navbar-nav"></Navbar.Toggle>

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mx-auto gap-3 align-items-center'>
                        {
                            user?.rol === 'usuario' && (
                                <>
                                    <Nav.Link as={Link} to='/dash-user/reserva-equipo' className="text-white fw-bold">Alquilar Equipos</Nav.Link>
                                    <Nav.Link as={Link} to='/dash-user/mis-reservas' className="text-white fw-bold">Mis reservas</Nav.Link>
                                    <Nav.Link as={Link} to='/dash-user/chat' className="text-white fw-bold">Chat</Nav.Link>
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
